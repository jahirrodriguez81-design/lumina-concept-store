const { calcTotal } = require('../lib/prices');
const { createPayPalOrder } = require('../lib/paypal');
const { saveOrder } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { items, promoCode } = req.body;
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: 'Carrito vacío' });

    const { total, subtotal, shipping, discount } = calcTotal(items, promoCode);
    const order = await createPayPalOrder(total);

    await saveOrder({
      paypalOrderId: order.id,
      total, subtotal, shipping, discount,
      items,
      promoCode: promoCode || null,
    });

    res.json({ orderID: order.id });
  } catch (err) {
    console.error('[create-order]', err.message);
    res.status(500).json({ error: 'Error al crear la orden de pago' });
  }
};
