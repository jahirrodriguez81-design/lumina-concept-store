/* ═══════════════════════════════════════════
   LUMINA — Cliente de autenticación Supabase
   ═══════════════════════════════════════════ */

const SUPABASE_URL      = 'https://itiprddtcgminlwhordg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qWwKVTzub3CCotIlJDGXcg__yskL31K';

const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Sesión y usuario ──────────────────────────────────────
async function getSession() {
  const { data } = await _sb.auth.getSession();
  return data.session;
}

async function getCurrentUser() {
  const { data } = await _sb.auth.getUser();
  return data.user || null;
}

// ── Registro ──────────────────────────────────────────────
async function signUp(email, password, nombre, apellidos) {
  const { data, error } = await _sb.auth.signUp({ email, password });
  if (error) throw error;
  if (data.user) {
    await _sb.from('profiles').insert({
      id: data.user.id,
      nombre: nombre || '',
      apellidos: apellidos || '',
    });
  }
  return data;
}

// ── Login ─────────────────────────────────────────────────
async function signIn(email, password) {
  const { data, error } = await _sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// ── Logout ────────────────────────────────────────────────
async function signOut() {
  await _sb.auth.signOut();
  window.location.href = 'index.html';
}

// ── Perfil ────────────────────────────────────────────────
async function getProfile() {
  const { data } = await _sb.from('profiles').select('*').single();
  return data || null;
}

async function updateProfile(updates) {
  const user = await getCurrentUser();
  if (!user) throw new Error('No autenticado');
  const { error } = await _sb.from('profiles').upsert({
    id: user.id,
    ...updates,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

// ── Favoritos ─────────────────────────────────────────────
async function getFavorites() {
  const { data } = await _sb.from('favorites').select('product_id');
  return (data || []).map(f => f.product_id);
}

async function toggleFavorite(productId) {
  const user = await getCurrentUser();
  if (!user) { window.location.href = 'login.html'; return null; }

  const { data: existing } = await _sb.from('favorites')
    .select('id').eq('product_id', productId).maybeSingle();

  if (existing) {
    await _sb.from('favorites').delete().eq('product_id', productId).eq('user_id', user.id);
    return false;
  } else {
    await _sb.from('favorites').insert({ user_id: user.id, product_id: productId });
    return true;
  }
}

// ── Mis pedidos ───────────────────────────────────────────
async function getMyOrders() {
  const { data } = await _sb.from('orders')
    .select('*').order('created_at', { ascending: false });
  return data || [];
}

// ── Actualizar navbar ─────────────────────────────────────
async function updateNavAuth() {
  const btn = document.getElementById('nav-auth-btn');
  if (!btn) return;
  try {
    const session = await getSession();
    if (session) {
      const profile = await getProfile();
      const name = profile?.nombre || session.user.email.split('@')[0];
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> ${name}`;
      btn.href = 'perfil.html';
      btn.classList.add('logged-in');
    } else {
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Ingresar`;
      btn.href = 'login.html';
      btn.classList.remove('logged-in');
    }
  } catch(e) { /* silently fail */ }
}
