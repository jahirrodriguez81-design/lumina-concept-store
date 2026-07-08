require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// ── Validación temprana de variables de entorno ──────────
['PAYPAL_CLIENT_ID', 'PAYPAL_SECRET'].forEach(key => {
  if (!process.env[key]) {
    console.error(`[Lumina] Variable de entorno requerida no configurada: ${key}`);
    process.exit(1);
  }
});

const app = express();

// ── Headers de seguridad (helmet) ────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc:  ["'self'"],
        scriptSrc:   ["'self'", "'unsafe-inline'",
                      'https://www.paypal.com', 'https://www.paypalobjects.com',
                      'https://unpkg.com', 'https://fonts.googleapis.com'],
        styleSrc:    ["'self'", "'unsafe-inline'",
                      'https://fonts.googleapis.com', 'https://unpkg.com'],
        fontSrc:     ["'self'", 'https://fonts.gstatic.com'],
        imgSrc:      ["'self'", 'data:', 'https://images.unsplash.com',
                      'https://image.pollinations.ai',
                      'https://www.paypalobjects.com'],
        connectSrc:  ["'self'", 'https://www.paypal.com',
                      'https://api-m.sandbox.paypal.com',
                      'https://api-m.paypal.com'],
        frameSrc:    ["'self'", 'https://www.paypal.com'],
        objectSrc:   ["'none'"],
        baseUri:     ["'self'"],
      },
    },
    // Fuerza HTTPS en producción (1 año)
    hsts: process.env.NODE_ENV === 'production'
      ? { maxAge: 31536000, includeSubDomains: true }
      : false,
  })
);

// ── Parseo de JSON con límite de tamaño ──────────────────
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname)));

// ── Rate limiting ────────────────────────────────────────

// Límite general para todas las rutas /api/*
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.' },
});

// Límite estricto para las rutas de pago (evita fuerza bruta)
const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Límite de intentos de pago alcanzado. Intenta en 1 hora.' },
});

app.use('/api/', apiLimiter);
app.use('/api/create-order',  paymentLimiter);
app.use('/api/capture-order', paymentLimiter);

// ── Fuente de verdad de precios — el cliente nunca decide el precio ──
const PAYPAL_API = process.env.PAYPAL_ENV === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

const PRICES = {
  1:  65.00,  // Vestido Lumina Floral
  2:  120.00, // Abrigo Oslo Premium
  3:  52.00,  // Look Editora Urban
  4:  32.00,  // Kit Accesorios Dorados
  5:  28.00,  // Camisa Linen Executive
  6:  72.00,  // Jumpsuit Sunset Coral
  7:  85.00,  // Tote Bag Lumina
  8:  150.00, // Look Editorial Noche
  9:  38.00,  // Blusa Lumina Signature
  10: 42.00,  // Set Casual Verano
  11: 45.00,  // Jean Slim Vintage
  12: 98.00,  // Bolso Flame Edition
  13: 20.00,  // Polo Piqué Premium
  14: 55.00,  // Gafas Lumina Signature
  15: 78.00,  // Mochila Urban Pro
};

const SHIPPING_THRESHOLD = 80;
const SHIPPING_COST = 4.99;

// Códigos de descuento — solo existen en el servidor
const PROMO_CODES = {
  LUMINA10:   0.10,
  MODA15:     0.15,
  BIENVENIDO: 0.05,
};

// ── Caché del token PayPal (evita re-autenticación en cada petición) ──
let tokenCache = { value: null, expiresAt: 0 };

async function getPayPalToken() {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt) {
    return tokenCache.value;
  }

  const credentials = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error('No se pudo autenticar con PayPal');

  const data = await res.json();
  // El buffer de 60 s evita usar un token a punto de expirar
  tokenCache = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return tokenCache.value;
}

// ── Cálculo de total — única fuente de verdad ────────────
function calcTotal(items, promoCode) {
  if (items.length > 50) throw new Error('El carrito excede el límite permitido');

  let subtotal = 0;
  for (const { id, qty } of items) {
    const price = PRICES[Number(id)];
    if (!price) throw new Error(`Producto ID ${id} no existe`);
    if (!Number.isInteger(qty) || qty < 1 || qty > 10)
      throw new Error(`Cantidad inválida para producto ${id}`);
    subtotal += price * qty;
  }

  const shipping  = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const pct       = promoCode ? (PROMO_CODES[promoCode.toUpperCase()] ?? 0) : 0;
  const discount  = parseFloat((subtotal * pct).toFixed(2));
  const total     = parseFloat(Math.max(0, subtotal + shipping - discount).toFixed(2));

  return { subtotal, shipping, discount, total };
}

// ── Tracking de órdenes pendientes ───────────────────────
// Almacena { total, createdAt } por orderID de PayPal para verificar
// en la captura que el monto sea exactamente el que calculó el servidor.
const pendingOrders = new Map();

// Limpieza automática de órdenes antiguas (> 3 h) cada 30 min
setInterval(() => {
  const limit = Date.now() - 3 * 60 * 60 * 1000;
  for (const [id, entry] of pendingOrders) {
    if (entry.createdAt < limit) pendingOrders.delete(id);
  }
}, 30 * 60 * 1000);

// ── Rutas API ────────────────────────────────────────────

// Client ID público para cargar la SDK de PayPal en el browser
app.get('/api/config', (_req, res) => {
  res.json({ paypalClientId: process.env.PAYPAL_CLIENT_ID });
});

// Calcula el total del servidor (usado por el frontend para mostrar
// el desglose real antes del pago — también cubre el checkout por WA)
app.post('/api/quote', (req, res) => {
  try {
    const { items, promoCode } = req.body;
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: 'Carrito vacío' });

    const breakdown = calcTotal(items, promoCode ?? null);
    res.json(breakdown);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Valida el código promo sin exponer la lista completa
app.post('/api/apply-promo', (req, res) => {
  const code = (req.body.code || '').trim().toUpperCase();
  if (!code) return res.status(400).json({ error: 'Código vacío' });

  const pct = PROMO_CODES[code];
  if (!pct) return res.status(400).json({ error: 'Código no válido' });

  res.json({
    discount: pct,
    message: `Código aplicado: ${Math.round(pct * 100)}% de descuento`,
  });
});

// Crea la orden en PayPal con precios calculados en el servidor
app.post('/api/create-order', async (req, res) => {
  try {
    const { items, promoCode } = req.body;

    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: 'Carrito vacío' });

    const { total } = calcTotal(items, promoCode);
    const token = await getPayPalToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          description: 'Lumina Concept Store',
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
          },
        }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('[PayPal] create-order error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Error al crear la orden de pago' });
    }

    // Guardamos el total esperado para verificarlo en la captura
    pendingOrders.set(data.id, { total, createdAt: Date.now() });

    res.json({ orderID: data.id });
  } catch (err) {
    console.error('[PayPal] create-order:', err.message);
    res.status(500).json({ error: 'Error interno al procesar el pedido' });
  }
});

// Captura el pago y verifica que el monto coincida con lo calculado
app.post('/api/capture-order', async (req, res) => {
  try {
    const { orderID } = req.body;

    if (typeof orderID !== 'string' || !orderID.trim())
      return res.status(400).json({ error: 'orderID requerido' });

    const expected = pendingOrders.get(orderID);
    if (!expected)
      return res.status(400).json({ error: 'Orden no reconocida o ya procesada' });

    const token = await getPayPalToken();

    const response = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.status !== 'COMPLETED') {
      console.error('[PayPal] capture inesperado:', JSON.stringify(data));
      return res.status(400).json({ error: 'El pago no fue completado', status: data.status });
    }

    // Verificación de monto: compara lo capturado con lo calculado en el servidor
    const capturedAmount = parseFloat(
      data.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? '0'
    );
    if (Math.abs(capturedAmount - expected.total) > 0.01) {
      console.error(
        `[PayPal] Discrepancia de monto — orden ${orderID}: ` +
        `capturado $${capturedAmount}, esperado $${expected.total}`
      );
      return res.status(400).json({ error: 'Discrepancia en el monto del pago' });
    }

    // Orden procesada con éxito: se elimina del registro pendiente
    pendingOrders.delete(orderID);

    res.json({ success: true, orderID });
  } catch (err) {
    console.error('[PayPal] capture-order:', err.message);
    res.status(500).json({ error: 'Error interno al confirmar el pago' });
  }
});

// ── Inicio ───────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Lumina] Servidor corriendo en http://localhost:${PORT}`);
});
