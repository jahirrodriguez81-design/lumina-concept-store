const { capturePayPalOrder } = require('../lib/paypal');
const { getPendingOrder, completeOrder } = require('../lib/supabase');
const { sendOrderEmail } = require('../lib/email');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { orderID, expectedTotal } = req.body;
    if (typeof orderID !== 'string' || !orderID.trim())
      return res.status(400).json({ error: 'orderID requerido' });

    // Capturar el pago en PayPal — esto es lo crítico
    const data = await capturePayPalOrder(orderID);

    if (data.status !== 'COMPLETED') {
      console.error('[capture-order] estado inesperado:', data.status);
      return res.status(400).json({ error: 'El pago no fue completado', status: data.status });
    }

    const capturedAmount = parseFloat(
      data.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? '0'
    );

    // Verificar monto contra Supabase (si está) o contra el total enviado por el cliente
    let pending = null;
    try { pending = await getPendingOrder(orderID); } catch (e) { /* tabla puede no existir */ }

    const expectedAmt = pending?.total ?? expectedTotal ?? null;
    if (expectedAmt !== null && Math.abs(capturedAmount - expectedAmt) > 0.01) {
      console.error(`[capture-order] Discrepancia: capturado $${capturedAmount}, esperado $${expectedAmt}`);
      return res.status(400).json({ error: 'Discrepancia en el monto del pago' });
    }

    // Marcar como completado en Supabase (no bloquea si falla)
    try { await completeOrder(orderID); } catch (e) {
      console.warn('[capture-order] No se pudo actualizar estado en Supabase:', e.message);
    }

    // Enviar ticket por correo (no bloquea el pago si falla)
    const orderNum = 'LCS-' + Date.now().toString().slice(-6);
    if (pending) {
      sendOrderEmail({
        orderNum,
        paypalOrderId: orderID,
        delivery:  pending.delivery  || {},
        items:     pending.items     || [],
        subtotal:  pending.subtotal  ?? capturedAmount,
        shipping:  pending.shipping  ?? 0,
        discount:  pending.discount  ?? 0,
        total:     pending.total     ?? capturedAmount,
      }).catch(err => console.error('[email] Error enviando ticket:', err.message));
    }

    res.json({ success: true, orderID, orderNum });
  } catch (err) {
    console.error('[capture-order]', err.message);
    res.status(500).json({ error: 'Error interno al confirmar el pago' });
  }
};
