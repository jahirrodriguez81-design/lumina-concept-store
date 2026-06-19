/* ══════════════════════════════════════
   LUMINA CONCEPT STORE — main.js
   ══════════════════════════════════════ */

// ── ACTIVE NAV LINK ──
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// ── CART STATE ──
let cart = JSON.parse(localStorage.getItem('lumina_cart') || '[]');

function updateCartUI() {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cart.length;
  });
}

function addToCart(productId, name, price, img, size, color) {
  const existing = cart.find(i => i.productId === productId && i.size === size && i.color === color);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: Date.now(), productId, name, price, img: img || '', size: size || '', color: color || '', qty: 1 });
  }
  localStorage.setItem('lumina_cart', JSON.stringify(cart));
  updateCartUI();
  showToast(`Agregado: ${name}`);
}

updateCartUI();

// ── TOAST ──
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── QUICK ADD BUTTONS ──
document.querySelectorAll('.product-quick-add').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const card = btn.closest('.product-card');
    const pid   = card.dataset.id || 0;
    const name  = card.querySelector('.product-name')?.textContent?.trim() || 'Producto';
    const priceRaw = card.querySelector('.product-price')?.childNodes[0]?.textContent?.trim() || '0';
    const price = parseFloat(priceRaw.replace(/[^0-9.]/g,'')) || 0;
    const img   = card.querySelector('.product-image img')?.src || '';
    addToCart(pid, name, price, img, '', '');
  });
});

// Product cards → navigate to detail on click (but not on action buttons)
document.querySelectorAll('.product-card[data-id]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    if (e.target.closest('.product-quick-add, .product-wishlist')) return;
    window.location.href = `producto.html?id=${card.dataset.id}`;
  });
});

// ── WISHLIST ──
document.querySelectorAll('.product-wishlist').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const on = btn.dataset.liked === 'true';
    btn.dataset.liked = !on;
    btn.textContent = on ? '♡' : '♥';
    btn.style.color = on ? '' : '#EF4444';
    if (!on) showToast('❤ Agregado a favoritos');
  });
});

// ── FILTER TABS ──
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    tab.closest('.filter-tabs').querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filterProducts(tab.dataset.filter || 'all');
  });
});

function filterProducts(filter) {
  document.querySelectorAll('.product-card[data-category]').forEach(card => {
    const cats = card.dataset.category.split(' ');
    const show = filter === 'all' || cats.includes(filter);
    card.style.display = show ? '' : 'none';
  });
}

// ── WHATSAPP FLOAT ──
// Already handled in HTML href

// ── CHATBOT ──
const chatbotData = {
  welcome: {
    msg: '¡Hola! Soy Luna, tu asistente de Lumina ✨ ¿En qué te puedo ayudar hoy?',
    options: [
      { label: '👗 Ver productos y catálogo', next: 'products' },
      { label: '📦 Consultar mi pedido', next: 'orders' },
      { label: '🤝 Compras al por mayor', next: 'wholesale' },
      { label: '💡 Asesoría de imagen', next: 'styling' },
      { label: '💬 Hablar con un asesor', next: 'human' },
    ]
  },
  products: {
    msg: '¡Claro! Tenemos nuevas colecciones disponibles. ¿Qué categoría te interesa?',
    options: [
      { label: '👕 Ropa casual y streetwear', next: 'catalog_link' },
      { label: '🧥 Abrigos y chaquetas', next: 'catalog_link' },
      { label: '👟 Calzado y accesorios', next: 'catalog_link' },
      { label: '🔙 Volver al menú', next: 'welcome' },
    ]
  },
  orders: {
    msg: 'Para rastrear tu pedido necesito tu número de orden. También puedes revisar tu correo de confirmación. ¿Tienes el número de orden?',
    options: [
      { label: '📧 Me llegó correo de confirmación', next: 'order_ok' },
      { label: '❓ No tengo número de orden', next: 'order_help' },
      { label: '🔙 Volver al menú', next: 'welcome' },
    ]
  },
  order_ok: {
    msg: 'Perfecto. Escribe tu número de orden (ej: LCS-2026-001) y te doy el estado en segundos 📦',
    options: [{ label: '🔙 Volver al menú', next: 'welcome' }]
  },
  order_help: {
    msg: 'Sin problema. Te conectamos con un asesor para que te ayude a localizar tu pedido. Tiempo de respuesta: menos de 48h ⏱',
    options: [
      { label: '📱 Ir a WhatsApp', next: 'wa' },
      { label: '🔙 Volver al menú', next: 'welcome' },
    ]
  },
  wholesale: {
    msg: '¡Genial! Trabajamos con boutiques, tiendas y distribuidores. ¿Qué necesitas saber?',
    options: [
      { label: '💰 Precios y descuentos por volumen', next: 'wholesale_price' },
      { label: '📋 Proceso de registro', next: 'wholesale_register' },
      { label: '🔙 Volver al menú', next: 'welcome' },
    ]
  },
  wholesale_price: {
    msg: 'Ofrecemos descuentos desde el 20% para pedidos de 10+ unidades y hasta 40% para pedidos de 50+. ¿Te interesa hablar con nuestro equipo B2B?',
    options: [
      { label: '✅ Sí, quiero más información', next: 'wa' },
      { label: '🔙 Volver', next: 'wholesale' },
    ]
  },
  wholesale_register: {
    msg: 'El proceso es simple: 1) Regístrate en nuestra sección Mayoristas, 2) Verificamos tu RUC, 3) Te activamos acceso a precios especiales en 24h.',
    options: [
      { label: '📝 Ir a registro mayoristas', next: 'wholesale_link' },
      { label: '🔙 Volver', next: 'wholesale' },
    ]
  },
  styling: {
    msg: '¡Me encanta! Nuestros asesores de imagen te ayudan a encontrar el estilo perfecto para ti. ¿Cuándo quieres tu sesión?',
    options: [
      { label: '⚡ Ahora mismo (WhatsApp)', next: 'wa' },
      { label: '📅 Agendar para más tarde', next: 'wa' },
      { label: '🔙 Volver al menú', next: 'welcome' },
    ]
  },
  human: {
    msg: 'Te conecto con un asesor ahora mismo. Tiempo de respuesta: menos de 30 minutos en horario laboral (9:00–18:00) 🕐',
    options: [
      { label: '📱 Abrir WhatsApp', next: 'wa' },
      { label: '📧 Preferiero email', next: 'email' },
      { label: '🔙 Volver al menú', next: 'welcome' },
    ]
  },
  wa: { msg: 'Abriendo WhatsApp... 📱', action: 'wa' },
  email: { msg: 'Puedes escribirnos a lumina.store.ec@gmail.com — respondemos en menos de 24h 📧', options: [{ label: '🔙 Volver al menú', next: 'welcome' }] },
  catalog_link: { msg: 'Redirigiendo al catálogo... 🛍', action: 'catalog' },
  wholesale_link: { msg: 'Redirigiendo a registro de mayoristas... 📋', action: 'wholesale_page' },
};

let chatOpen = false;

function initChatbot() {
  const toggle = document.querySelector('.chatbot-toggle');
  const win = document.querySelector('.chatbot-window');
  const body = document.querySelector('.chatbot-body');
  if (!toggle || !win || !body) return;

  toggle.addEventListener('click', () => {
    chatOpen = !chatOpen;
    win.classList.toggle('open', chatOpen);
    toggle.textContent = chatOpen ? '✕' : '✦';
    if (chatOpen && body.children.length === 0) renderStep('welcome');
  });

  function renderStep(key) {
    const step = chatbotData[key];
    if (!step) return;

    if (step.action === 'wa') {
      window.open('https://wa.me/593000000000?text=Hola!%20vengo%20desde%20la%20web%20de%20Lumina', '_blank');
      addMsg('bot', '¡Abriendo WhatsApp! Si no se abre automáticamente, escríbenos al número en la página de contacto 😊');
      setTimeout(() => renderOptions([{ label: '🔙 Volver al menú', next: 'welcome' }]), 500);
      return;
    }
    if (step.action === 'catalog') {
      window.location.href = 'catalogo.html';
      return;
    }
    if (step.action === 'wholesale_page') {
      window.location.href = 'mayoristas.html';
      return;
    }

    addMsg('bot', step.msg);
    if (step.options) {
      setTimeout(() => renderOptions(step.options), 300);
    }
  }

  function addMsg(type, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function renderOptions(options) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-options';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'chat-option';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        addMsg('user', opt.label);
        wrap.remove();
        setTimeout(() => renderStep(opt.next), 400);
      });
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  // Input libre
  const input = document.querySelector('.chatbot-footer input');
  const sendBtn = document.querySelector('.chatbot-footer button');
  if (input && sendBtn) {
    const sendMsg = () => {
      const txt = input.value.trim();
      if (!txt) return;
      addMsg('user', txt);
      input.value = '';
      setTimeout(() => {
        const lower = txt.toLowerCase();
        if (lower.includes('pedido') || lower.includes('orden')) renderStep('orders');
        else if (lower.includes('mayor') || lower.includes('b2b')) renderStep('wholesale');
        else if (lower.includes('asesor') || lower.includes('imagen')) renderStep('styling');
        else if (lower.includes('precio') || lower.includes('product')) renderStep('products');
        else {
          addMsg('bot', 'Entendido. ¿Te conecto con un asesor para ayudarte mejor?');
          setTimeout(() => renderOptions([
            { label: '✅ Sí, conectar con asesor', next: 'human' },
            { label: '🔙 Ver opciones principales', next: 'welcome' }
          ]), 300);
        }
      }, 500);
    };
    sendBtn.addEventListener('click', sendMsg);
    input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMsg(); });
  }
}

// ── RECENTLY VIEWED ──
function saveRecentlyViewed(productId) {
  let rv = JSON.parse(localStorage.getItem('lumina_rv') || '[]');
  rv = rv.filter(id => id !== productId);
  rv.unshift(productId);
  rv = rv.slice(0, 8);
  localStorage.setItem('lumina_rv', JSON.stringify(rv));
}

function renderRecentlyViewed(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const rv = JSON.parse(localStorage.getItem('lumina_rv') || '[]');
  if (rv.length === 0) { container.closest('.recently-viewed') && (container.closest('.recently-viewed').style.display = 'none'); return; }
  const products = typeof LUMINA_PRODUCTS !== 'undefined' ? LUMINA_PRODUCTS : [];
  const items = rv.map(id => products.find(p => p.id === id)).filter(Boolean);
  if (items.length === 0) { container.closest('.recently-viewed') && (container.closest('.recently-viewed').style.display = 'none'); return; }
  container.innerHTML = items.map(p => `
    <div class="recently-viewed-item" onclick="window.location.href='producto.html?id=${p.id}'">
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="recently-viewed-item-info">
        <div class="recently-viewed-item-name">${p.name}</div>
        <div class="recently-viewed-item-price">$${p.price.toFixed(2)}</div>
      </div>
    </div>`).join('');
}

// ── SEARCH OVERLAY ──
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'searchOverlay';
  overlay.innerHTML = `
    <div class="search-top">
      <div class="search-input-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input class="search-input" id="searchInput" type="text" placeholder="Buscar productos, categorías..." autocomplete="off" />
        <span class="search-kbd">Esc para cerrar</span>
      </div>
      <button class="search-close" id="searchCloseBtn" aria-label="Cerrar búsqueda">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="search-body">
      <div class="search-cats" id="searchCats">
        <button class="search-cat-btn active" data-cat="todo">Todo</button>
        <button class="search-cat-btn" data-cat="mujer">Mujer</button>
        <button class="search-cat-btn" data-cat="hombre">Hombre</button>
        <button class="search-cat-btn" data-cat="accesorios">Accesorios</button>
      </div>
      <div class="search-trending" id="searchTrending">
        <div class="search-trending-label">Tendencias</div>
        <div class="trending-chips">
          <span class="trending-chip" onclick="setSearchQuery('vestidos')">Vestidos</span>
          <span class="trending-chip" onclick="setSearchQuery('abrigos')">Abrigos</span>
          <span class="trending-chip" onclick="setSearchQuery('accesorios')">Accesorios</span>
          <span class="trending-chip" onclick="setSearchQuery('look')">Looks completos</span>
          <span class="trending-chip" onclick="setSearchQuery('bolso')">Bolsos</span>
          <span class="trending-chip" onclick="setSearchQuery('jean')">Jeans</span>
        </div>
      </div>
      <p class="search-hint" id="searchHint" style="display:none">Escribe para buscar en el catálogo</p>
      <div class="search-results-grid" id="searchResultsGrid"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  let currentCat = 'todo';

  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
    renderSearchResults('');
  }

  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResultsGrid').innerHTML = '';
    document.getElementById('searchHint').style.display = '';
  }

  function renderSearchResults(query) {
    const grid = document.getElementById('searchResultsGrid');
    const hint = document.getElementById('searchHint');
    const products = typeof LUMINA_PRODUCTS !== 'undefined' ? LUMINA_PRODUCTS : [];

    const q = query.trim().toLowerCase();
    let filtered = products.filter(p => {
      const matchCat = currentCat === 'todo' || p.category.toLowerCase() === currentCat;
      const matchQ = !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.sub && p.sub.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    if (filtered.length === 0 && q) {
      hint.style.display = 'none';
      grid.innerHTML = `
        <div class="search-no-results" style="grid-column:1/-1">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h4>Sin resultados para "${query}"</h4>
          <p>Intenta con otra palabra o explora por categoría</p>
        </div>`;
      return;
    }

    const trending = document.getElementById('searchTrending');
    if (trending) trending.style.display = q ? 'none' : '';
    hint.style.display = 'none';
    if (!q && currentCat === 'todo') {
      grid.innerHTML = '';
      return;
    }

    grid.innerHTML = filtered.slice(0, 8).map(p => `
      <div class="product-card" style="cursor:pointer" onclick="closeSearchAndGo('producto.html?id=${p.id}')">
        <div class="product-image">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          ${p.badge ? `<span class="product-badge ${p.badge.includes('-') ? 'sale' : ''}">${p.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <div class="product-category">${p.category} · ${p.sub}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-footer">
            <div class="product-price">$${p.price.toFixed(2)} ${p.oldPrice ? `<span class="old">$${p.oldPrice.toFixed(2)}</span>` : ''}</div>
            <div class="color-dots">${p.colors.slice(0, 3).map(c => `<div class="color-dot" style="background:${c.hex}"></div>`).join('')}</div>
          </div>
        </div>
      </div>`).join('');
  }

  window.setSearchQuery = function(q) {
    const inp = document.getElementById('searchInput');
    inp.value = q;
    renderSearchResults(q);
    inp.focus();
  };

  window.openSearch = openSearch;
  window.closeSearchAndGo = function (url) {
    closeSearch();
    window.location.href = url;
  };

  document.getElementById('searchCloseBtn').addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  document.getElementById('searchInput').addEventListener('input', e => {
    renderSearchResults(e.target.value);
  });

  document.getElementById('searchCats').addEventListener('click', e => {
    const btn = e.target.closest('.search-cat-btn');
    if (!btn) return;
    document.querySelectorAll('.search-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    renderSearchResults(document.getElementById('searchInput').value);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });
})();

// ── NEWSLETTER ──
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (email?.value) {
      showToast(`✓ ¡Listo! ${email.value} suscrito a Lumina`);
      email.value = '';
    }
  });
});

// ── CONTACT FORM ──
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✓ Mensaje enviado. Te respondemos en menos de 24h');
    contactForm.reset();
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
  updateCartUI();
});
