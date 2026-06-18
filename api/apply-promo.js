const { PROMO_CODES } = require('../lib/prices');

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const code = (req.body?.code || '').trim().toUpperCase();
  if (!code) return res.status(400).json({ error: 'Código vacío' });
  const pct = PROMO_CODES[code];
  if (!pct) return res.status(400).json({ error: 'Código no válido' });
  res.json({ discount: pct, message: `Código aplicado: ${Math.round(pct * 100)}% de descuento` });
};
