-- ═══════════════════════════════════════════════════════════
-- Lumina Concept Store — Activar RLS en tabla orders
-- Ejecuta en: supabase.com → tu proyecto → SQL Editor
-- ═══════════════════════════════════════════════════════════

-- Habilitar seguridad a nivel de fila en orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política: cada usuario solo ve sus propios pedidos
DROP POLICY IF EXISTS "orders_own_select" ON orders;
CREATE POLICY "orders_own_select"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- El backend (service role) puede leer y escribir todo
DROP POLICY IF EXISTS "orders_service" ON orders;
CREATE POLICY "orders_service"
  ON orders FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
