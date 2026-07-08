const nodemailer = require('nodemailer');

function formatSku(id) {
  return 'LCS-' + String(id).padStart(3, '0');
}

function buildOrderEmail({ orderNum, paypalOrderId, delivery, items, subtotal, shipping, discount, total }) {
  const rows = items.map(item => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #1e1e1e;color:#aaa;font-size:13px">${formatSku(item.id)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #1e1e1e;color:#fff;font-size:13px">${item.name || '—'}${item.size ? ' · ' + item.size : ''}${item.color ? ' · ' + item.color : ''}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #1e1e1e;color:#fff;font-size:13px;text-align:center">${item.qty}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #1e1e1e;color:#c4ff00;font-size:13px;text-align:right">$${(item.price * item.qty).toFixed(2)}</td>
    </tr>`).join('');

  const discountRow = discount > 0 ? `
    <tr>
      <td colspan="2" style="padding:6px 12px;color:#aaa;font-size:13px;text-align:right">Descuento</td>
      <td style="padding:6px 12px;color:#c4ff00;font-size:13px;text-align:right">-$${discount.toFixed(2)}</td>
    </tr>` : '';

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><title>Nuevo pedido ${orderNum}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'DM Sans',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a">
  <tr><td align="center" style="padding:32px 16px">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #1e1e1e;border-radius:16px;overflow:hidden">

      <!-- HEADER -->
      <tr><td style="background:#c4ff00;padding:24px 32px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td><span style="font-family:Arial,sans-serif;font-size:22px;font-weight:900;letter-spacing:-1px;color:#080808">LUMIN<span>A</span></span></td>
            <td align="right"><span style="font-size:12px;font-weight:700;color:#080808;opacity:.7;letter-spacing:1px;text-transform:uppercase">Nuevo pedido</span></td>
          </tr>
        </table>
      </td></tr>

      <!-- ORDER NUMBER -->
      <tr><td style="padding:24px 32px 0">
        <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555">Número de orden</p>
        <p style="margin:6px 0 0;font-size:28px;font-weight:800;color:#fff;letter-spacing:-1px">${orderNum}</p>
        <p style="margin:4px 0 0;font-size:12px;color:#555">PayPal ID: ${paypalOrderId}</p>
      </td></tr>

      <!-- DIVIDER -->
      <tr><td style="padding:20px 32px"><hr style="border:none;border-top:1px solid #1e1e1e;margin:0"/></td></tr>

      <!-- CUSTOMER DATA -->
      <tr><td style="padding:0 32px 20px">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555">Datos del cliente</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;width:50%">
              <span style="font-size:11px;color:#555;display:block">Nombre</span>
              <span style="font-size:14px;color:#fff;font-weight:600">${delivery.name || '—'}</span>
            </td>
            <td style="padding:6px 0">
              <span style="font-size:11px;color:#555;display:block">Teléfono</span>
              <span style="font-size:14px;color:#fff;font-weight:600">${delivery.phone || '—'}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0">
              <span style="font-size:11px;color:#555;display:block">Ciudad</span>
              <span style="font-size:14px;color:#fff;font-weight:600">${delivery.city || '—'}</span>
            </td>
            <td style="padding:6px 0">
              <span style="font-size:11px;color:#555;display:block">Dirección</span>
              <span style="font-size:14px;color:#fff;font-weight:600">${delivery.address || '—'}</span>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- DIVIDER -->
      <tr><td style="padding:0 32px 20px"><hr style="border:none;border-top:1px solid #1e1e1e;margin:0"/></td></tr>

      <!-- PRODUCTS -->
      <tr><td style="padding:0 32px 20px">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555">Productos</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          <thead>
            <tr style="background:#1a1a1a">
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#555;font-weight:600;letter-spacing:1px">SKU</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;color:#555;font-weight:600;letter-spacing:1px">Producto</th>
              <th style="padding:10px 12px;text-align:center;font-size:11px;color:#555;font-weight:600;letter-spacing:1px">Cant.</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;color:#555;font-weight:600;letter-spacing:1px">Total</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </td></tr>

      <!-- TOTALS -->
      <tr><td style="padding:0 32px 32px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td colspan="2" style="padding:6px 12px;color:#aaa;font-size:13px;text-align:right">Subtotal</td>
            <td style="padding:6px 12px;color:#fff;font-size:13px;text-align:right;width:90px">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2" style="padding:6px 12px;color:#aaa;font-size:13px;text-align:right">Envío</td>
            <td style="padding:6px 12px;color:#fff;font-size:13px;text-align:right">${shipping === 0 ? 'Gratis' : '$' + shipping.toFixed(2)}</td>
          </tr>
          ${discountRow}
          <tr style="border-top:1px solid #1e1e1e">
            <td colspan="2" style="padding:12px 12px 0;color:#fff;font-size:16px;font-weight:800;text-align:right">TOTAL</td>
            <td style="padding:12px 12px 0;color:#c4ff00;font-size:18px;font-weight:800;text-align:right">$${total.toFixed(2)}</td>
          </tr>
        </table>
      </td></tr>

      <!-- FOOTER -->
      <tr><td style="background:#0a0a0a;padding:20px 32px;border-top:1px solid #1e1e1e">
        <p style="margin:0;font-size:12px;color:#444;text-align:center">
          Lumina Concept Store · Ecuador · <a href="mailto:jahirrodleo19@gmail.com" style="color:#c4ff00;text-decoration:none">jahirrodleo19@gmail.com</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  return html;
}

async function sendOrderEmail({ orderNum, paypalOrderId, delivery, items, subtotal, shipping, discount, total }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('[email] EMAIL_USER o EMAIL_PASS no configurados — se omite el correo de pedido');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const html = buildOrderEmail({ orderNum, paypalOrderId, delivery, items, subtotal, shipping, discount, total });

  await transporter.sendMail({
    from: `"Lumina Store" <${user}>`,
    to: user,
    subject: `🛍️ Nuevo pedido ${orderNum} — $${total.toFixed(2)} USD`,
    html,
  });

  console.log(`[email] Ticket enviado para ${orderNum}`);
}

module.exports = { sendOrderEmail, formatSku };
