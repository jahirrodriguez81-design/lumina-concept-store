const PRICES = {
  1:  68.00,  // Vestido Lumina Floral
  2:  89.00,  // Abrigo Oslo Premium
  3:  54.00,  // Look Editora Urban
  4:  42.00,  // Kit Accesorios Dorados
  5:  42.00,  // Camisa Linen Executive
  6:  59.00,  // Jumpsuit Sunset Coral
  7:  75.00,  // Tote Bag Lumina
  8:  95.00,  // Look Editorial Noche
  9:  45.00,  // Blusa Lumina Signature
  10: 49.00,  // Set Casual Verano
  11: 52.00,  // Jean Slim Vintage
  12: 82.00,  // Bolso Flame Edition
  13: 36.00,  // Polo Piqué Premium
  14: 55.00,  // Gafas Lumina Signature
  15: 68.00,  // Mochila Urban Pro
};

const SHIPPING_THRESHOLD = 80;
const SHIPPING_COST      = 4.99;

const PROMO_CODES = {
  LUMINA10:   0.10,
  MODA15:     0.15,
  BIENVENIDO: 0.05,
};

function calcTotal(items, promoCode) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('Carrito vacío');
  if (items.length > 50) throw new Error('El carrito excede el límite permitido');

  let subtotal = 0;
  for (const { id, qty } of items) {
    const price = PRICES[Number(id)];
    if (!price) throw new Error(`Producto ID ${id} no existe`);
    if (!Number.isInteger(qty) || qty < 1 || qty > 10)
      throw new Error(`Cantidad inválida para producto ${id}`);
    subtotal += price * qty;
  }

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const pct      = promoCode ? (PROMO_CODES[promoCode.toUpperCase()] ?? 0) : 0;
  const discount = parseFloat((subtotal * pct).toFixed(2));
  const total    = parseFloat(Math.max(0, subtotal + shipping - discount).toFixed(2));

  return { subtotal, shipping, discount, total };
}

module.exports = { PRICES, PROMO_CODES, SHIPPING_THRESHOLD, SHIPPING_COST, calcTotal };
