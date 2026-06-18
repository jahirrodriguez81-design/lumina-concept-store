-- ═══════════════════════════════════════════════════════════
-- Lumina Concept Store — Esquema Supabase
-- Ejecuta este SQL en: supabase.com → tu proyecto → SQL Editor
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS orders (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  paypal_order_id  TEXT        UNIQUE NOT NULL,
  status           TEXT        NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending', 'completed', 'failed')),
  total            NUMERIC(10,2) NOT NULL,
  subtotal         NUMERIC(10,2),
  shipping         NUMERIC(10,2),
  discount         NUMERIC(10,2) DEFAULT 0,
  items            JSONB       NOT NULL DEFAULT '[]',
  promo_code       TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  completed_at     TIMESTAMPTZ
);

-- Índices para consultas frecuentes del panel admin
CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- Row Level Security: el service_key del servidor puede leer y escribir todo.
-- El anon key (frontend) no tiene acceso — todas las lecturas pasan por /api/admin-orders.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "solo_service_role" ON orders
  USING (auth.role() = 'service_role');
