const { createClient } = require('@supabase/supabase-js');

let _client = null;

function getSupabase() {
  if (!_client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !key) throw new Error('Supabase no configurado: faltan SUPABASE_URL o SUPABASE_SERVICE_KEY');
    _client = createClient(url, key);
  }
  return _client;
}

async function saveOrder({ paypalOrderId, total, subtotal, shipping, discount, items, promoCode }) {
  const supabase = getSupabase();
  const { error } = await supabase.from('orders').insert({
    paypal_order_id: paypalOrderId,
    status:          'pending',
    total,
    subtotal,
    shipping,
    discount,
    items,
    promo_code:      promoCode || null,
  });
  if (error) throw new Error(`Supabase saveOrder: ${error.message}`);
}

async function getPendingOrder(paypalOrderId) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('paypal_order_id', paypalOrderId)
    .eq('status', 'pending')
    .single();
  if (error) return null;
  return data;
}

async function completeOrder(paypalOrderId) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('orders')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('paypal_order_id', paypalOrderId);
  if (error) throw new Error(`Supabase completeOrder: ${error.message}`);
}

async function getOrders({ limit = 50, offset = 0, status } = {}) {
  const supabase = getSupabase();
  let query = supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) throw new Error(`Supabase getOrders: ${error.message}`);
  return data;
}

module.exports = { saveOrder, getPendingOrder, completeOrder, getOrders };
