const { calcTotal } = require('../lib/prices');
const { createPayPalOrder } = require('../lib/paypal');
const { saveOrder, getSupabase } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { items, promoCode, delivery } = req.body;
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: 'Carrito vacío' });

    // Calcular total en el servidor (fuente de verdad de precios)
    const { total, subtotal, shipping, discount } = calcTotal(items, promoCode);

    // Crear la orden en PayPal — esto es lo crítico para el pago
    const order = await createPayPalOrder(total);

    // Identificar usuario (opcional — no bloquea el pago si falla)
    let userId = null;
    try {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        const { data } = await getSupabase().auth.getUser(token);
        userId = data?.user?.id || null;
      }
    } catch (e) {
      console.warn('[create-order] No se pudo obtener usuario:', e.message);
    }

    // Guardar en Supabase (opcional — no bloquea el pago si falla)
    try {
      await saveOrder({
        paypalOrderId: order.id,
        total, subtotal, shipping, discount,
        items,
        promoCode: promoCode || null,
        delivery:  delivery  || null,
        userId:    userId    || null,
      });
    } catch (e) {
      console.warn('[create-order] No se pudo guardar en Supabase:', e.message);
    }

    res.json({ orderID: order.id, expectedTotal: total });
  } catch (err) {
    console.error('[create-order]', err.message);
    res.status(500).json({ error: 'Error al crear la orden de pago' });
  }
};
