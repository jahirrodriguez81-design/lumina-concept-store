const { calcTotal } = require('../lib/prices');
const { createPayPalOrder } = require('../lib/paypal');
const { saveOrder, getSupabase } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { items, promoCode, delivery } = req.body;
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: 'Carrito vacío' });

    // Identificar usuario autenticado a partir del token de sesión
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const { data } = await getSupabase().auth.getUser(token);
      userId = data?.user?.id || null;
    }

    const { total, subtotal, shipping, discount } = calcTotal(items, promoCode);
    const order = await createPayPalOrder(total);

    await saveOrder({
      paypalOrderId: order.id,
      total, subtotal, shipping, discount,
      items,
      promoCode: promoCode || null,
      delivery:  delivery  || null,
      userId:    userId    || null,
    });

    res.json({ orderID: order.id });
  } catch (err) {
    console.error('[create-order]', err.message);
    res.status(500).json({ error: 'Error al crear la orden de pago' });
  }
};
