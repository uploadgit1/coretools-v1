// ============================================================
// app.js — Homepage: data loading, card rendering, filtering,
//          search, and view switching
// ============================================================
//
// NOTE: This site uses fetch() to load tools.json.
// Opening index.html directly as a local file (file://) will
// block fetch due to browser security. To test locally, use:
//   python3 -m http.server 8000
// then visit: http://localhost:8000
// Or just push to GitHub Pages and test there.
// ============================================================

let allTools = [];
let activeCategory = 'All';
let searchTerm = '';
let savedScrollY = 0;

// ============================================================
// INIT — load data and set up the page
// ============================================================
async function init() {
  try {
    const res = await fetch('assets/data/tools.json');
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    allTools = data.tools;

    renderCategoryPills();
    applyFilters();

    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Wire up the logo link to return home
    document.getElementById('logo-link').addEventListener('click', (e) => {
      e.preventDefault();
      showHomeView();
    });

    // Check if URL has a hash for deep linking
    checkHashOnLoad();

  } catch (err) {
    console.error('Could not load tools.json:', err);
    document.getElementById('card-grid').innerHTML =
      '<p style="color:#888; padding:2rem 0;">Could not load tools. Check the console for details.</p>';
  }
}

// ============================================================
// CATEGORY PILLS — generated from data
// ============================================================
function renderCategoryPills() {
  const categories = ['All', ...new Set(allTools.map(t => t.category))];
  const container = document.getElementById('category-pills');

  container.innerHTML = categories.map(cat => `
    <button
      class="pill${cat === activeCategory ? ' active' : ''}"
      data-category="${cat}"
      aria-pressed="${cat === activeCategory}"
    >${cat}</button>
  `).join('');

  container.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll('.pill').forEach(p => {
        const isActive = p.dataset.category === activeCategory;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-pressed', isActive);
      });
      applyFilters();
    });
  });
}

// ============================================================
// FILTERING — combines search and category
// ============================================================
function applyFilters() {
  const term = searchTerm.toLowerCase().trim();

  const filtered = allTools.filter(tool => {
    const matchesCategory =
      activeCategory === 'All' || tool.category === activeCategory;

    const matchesSearch =
      !term ||
      tool.name.toLowerCase().includes(term) ||
      tool.vendor.toLowerCase().includes(term) ||
      tool.shortDescription.toLowerCase().includes(term) ||
      (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(term)));

    return matchesCategory && matchesSearch;
  });

  renderCards(filtered);
}

// ============================================================
// RENDER CARDS
// ============================================================
function renderCards(tools) {
  const grid = document.getElementById('card-grid');
  const noResults = document.getElementById('no-results');

  if (tools.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  grid.innerHTML = tools.map(tool => {
    const thumb = tool.screenshots && tool.screenshots.length > 0
      ? `<img
           class="card-thumb"
           src="${tool.screenshots[0].src}"
           alt="${tool.screenshots[0].alt}"
           loading="lazy"
         />`
      : `<div class="card-thumb-placeholder">No image yet</div>`;

    const tags = tool.tags && tool.tags.length > 0
      ? `<div class="card-tags">
           ${tool.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
         </div>`
      : '';

    return `
      <article
        class="tool-card"
        role="listitem"
        tabindex="0"
        data-slug="${tool.slug}"
        aria-label="View details for ${tool.name}"
      >
        <div class="card-thumb-wrap">${thumb}</div>
        <div class="card-body">
          <div class="card-top">
            <div>
              <div class="card-name">${tool.name}</div>
              <div class="card-vendor">${tool.vendor}</div>
            </div>
            <span class="card-category">${tool.category}</span>
          </div>
          <p class="card-desc">${tool.shortDescription}</p>
          ${tags}
        </div>
      </article>
    `;
  }).join('');

  // Attach interaction to each card
  grid.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => openTool(card.dataset.slug));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTool(card.dataset.slug);
      }
    });
  });
}

// ============================================================
// VIEW SWITCHING — open tool detail
// ============================================================
function openTool(slug) {
  const tool = allTools.find(t => t.slug === slug);
  if (!tool) return;

  // Save scroll position so we can restore it on return
  savedScrollY = window.scrollY;

  document.getElementById('view-home').classList.add('hidden');
  document.getElementById('view-tool').classList.remove('hidden');
  window.scrollTo(0, 0);

  // Update URL hash for deep linking
  history.pushState({ slug }, '', `#${slug}`);

  // Render the tool detail (defined in tool.js)
  renderToolDetail(tool);
}

// ============================================================
// VIEW SWITCHING — return to homepage
// ============================================================
function showHomeView() {
  // Clear the video iframe src to stop playback
  const iframe = document.getElementById('tool-video-iframe');
  if (iframe) iframe.src = '';

  document.getElementById('view-tool').classList.add('hidden');
  document.getElementById('view-home').classList.remove('hidden');

  // Remove hash from URL
  history.pushState(null, '', window.location.pathname);

  // Restore scroll position
  requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
}

// ============================================================
// DEEP LINKING — check URL hash on page load
// ============================================================
function checkHashOnLoad() {
  const hash = window.location.hash.replace('#', '').trim();
  if (hash && allTools.find(t => t.slug === hash)) {
    openTool(hash);
  }
}

// ============================================================
// BROWSER BACK BUTTON
// ============================================================
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.slug) {
    openTool(e.state.slug);
  } else {
    // Only call showHomeView if the tool view is visible
    if (!document.getElementById('view-tool').classList.contains('hidden')) {
      showHomeView();
    }
  }
});

// ============================================================
// SEARCH INPUT
// ============================================================
document.getElementById('search-input').addEventListener('input', (e) => {
  searchTerm = e.target.value;
  applyFilters();
});

// ============================================================
// KICK OFF
// ============================================================
init();
