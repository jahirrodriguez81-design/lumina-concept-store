const { capturePayPalOrder } = require('../lib/paypal');
const { getPendingOrder, completeOrder } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { orderID } = req.body;
    if (typeof orderID !== 'string' || !orderID.trim())
      return res.status(400).json({ error: 'orderID requerido' });

    const pending = await getPendingOrder(orderID);
    if (!pending) return res.status(400).json({ error: 'Orden no reconocida o ya procesada' });

    const data = await capturePayPalOrder(orderID);

    if (data.status !== 'COMPLETED') {
      console.error('[capture-order] estado inesperado:', data.status);
      return res.status(400).json({ error: 'El pago no fue completado', status: data.status });
    }

    const capturedAmount = parseFloat(
      data.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? '0'
    );

    if (Math.abs(capturedAmount - pending.total) > 0.01) {
      console.error(`[capture-order] Discrepancia: capturado $${capturedAmount}, esperado $${pending.total}`);
      return res.status(400).json({ error: 'Discrepancia en el monto del pago' });
    }

    await completeOrder(orderID);

    res.json({ success: true, orderID });
  } catch (err) {
    console.error('[capture-order]', err.message);
    res.status(500).json({ error: 'Error interno al confirmar el pago' });
  }
};
