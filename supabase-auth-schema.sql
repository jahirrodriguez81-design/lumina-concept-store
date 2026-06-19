-- ═══════════════════════════════════════════════════════════
-- Lumina Concept Store — Esquema de cuentas de clientes
-- Ejecuta en: supabase.com → tu proyecto → SQL Editor
-- ═══════════════════════════════════════════════════════════

-- Tabla de perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nombre      TEXT        NOT NULL DEFAULT '',
  apellidos   TEXT        DEFAULT '',
  telefono    TEXT        DEFAULT '',
  cedula      TEXT        DEFAULT '',
  ciudad      TEXT        DEFAULT '',
  sector      TEXT        DEFAULT '',
  direccion   TEXT        DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id  INTEGER     NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Vincular pedidos con cuentas
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders (user_id);

-- RLS profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own"     ON profiles FOR ALL USING (auth.uid() = id)       WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_service" ON profiles FOR ALL TO service_role USING (true)  WITH CHECK (true);

-- RLS favorites
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favorites_own"     ON favorites FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_service" ON favorites FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Permitir a usuarios autenticados leer sus propios pedidos
CREATE POLICY "orders_own_select" ON orders FOR SELECT USING (auth.uid() = user_id);
