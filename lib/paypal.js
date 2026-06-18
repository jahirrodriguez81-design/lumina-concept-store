const PAYPAL_API = process.env.PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

let tokenCache = { value: null, expiresAt: 0 };

async function getPayPalToken() {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt) return tokenCache.value;

  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error('No se pudo autenticar con PayPal');

  const data = await res.json();
  tokenCache = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return tokenCache.value;
}

async function createPayPalOrder(total) {
  const token = await getPayPalToken();
  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        description: 'Lumina Concept Store',
        amount: { currency_code: 'USD', value: total.toFixed(2) },
      }],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

async function capturePayPalOrder(orderID) {
  const token = await getPayPalToken();
  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  return res.json();
}

module.exports = { getPayPalToken, createPayPalOrder, capturePayPalOrder };
