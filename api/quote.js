const { calcTotal } = require('../lib/prices');

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { items, promoCode } = req.body;
    res.json(calcTotal(items, promoCode ?? null));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
