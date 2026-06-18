module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();
  res.json({ paypalClientId: process.env.PAYPAL_CLIENT_ID });
};
