const { getOrders } = require('../lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN)
    return res.status(401).json({ error: 'No autorizado' });

  try {
    const status = req.query.status || null;
    const limit  = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const orders = await getOrders({ limit, offset, status });
    res.json({ orders });
  } catch (err) {
    console.error('[admin-orders]', err.message);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};
