-- ═══════════════════════════════════════════════════════════
-- Lumina Concept Store — Agregar columna delivery a orders
-- Ejecuta en: supabase.com → tu proyecto → SQL Editor
-- ═══════════════════════════════════════════════════════════

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS delivery JSONB DEFAULT NULL;
