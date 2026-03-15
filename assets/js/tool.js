// ============================================================
// tool.js — Tool detail view: rendering, gallery, keyboard nav
// ============================================================
// Called by app.js via renderToolDetail(tool)
// showHomeView() is defined in app.js
// ============================================================

let galleryScreenshots = [];
let galleryIndex = 0;

// ============================================================
// MAIN ENTRY — called from app.js when a card is clicked
// ============================================================
function renderToolDetail(tool) {
  renderHeader(tool);
  renderLinks(tool);
  renderWhoUsesIt(tool);
  renderGallery(tool.screenshots);
  renderVideo(tool.videoEmbedUrl);
  renderUseCases(tool.useCases);
  renderNotes(tool.notes);

  // Wire up back button (reassign each time so no stale handlers)
  document.getElementById('back-btn').onclick = () => showHomeView();
}

// ============================================================
// A: TOOL HEADER
// ============================================================
function renderHeader(tool) {
  const tagsHtml = tool.tags && tool.tags.length > 0
    ? `<div class="tool-header-tags">
         ${tool.tags.map(t => `<span class="tool-header-tag">${t}</span>`).join('')}
       </div>`
    : '';

  document.getElementById('tool-header').innerHTML = `
    <div class="tool-vendor-line">
      <span>${tool.vendor}</span>
      <span class="tool-category-pill">${tool.category}</span>
    </div>
    <h1 class="tool-title">${tool.name}</h1>
    <p class="tool-short-desc">${tool.shortDescription}</p>
    <div class="tool-best-for">
      <span class="tool-best-for-label">Best for:</span>${tool.bestFor}
    </div>
    ${tagsHtml}
  `;
}

// ============================================================
// B: OFFICIAL LINKS
// ============================================================
const LINK_LABELS = {
  website:   'Website',
  docs:      'Docs',
  blog:      'Blog',
  youtube:   'YouTube',
  linkedin:  'LinkedIn',
  instagram: 'Instagram'
};

function renderLinks(tool) {
  const section = document.getElementById('tool-links-section');
  const links = tool.officialLinks || {};
  const validLinks = Object.entries(links).filter(([, url]) => url && url.trim() !== '');

  if (validLinks.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');

  document.getElementById('tool-links').innerHTML = validLinks.map(([key, url]) => `
    <a
      href="${url}"
      class="tool-link-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${LINK_LABELS[key] || key} — opens in new tab"
    >${LINK_LABELS[key] || key}</a>
  `).join('');
}

// ============================================================
// C: WHO'S USING IT
// ============================================================
function renderWhoUsesIt(tool) {
  const section = document.getElementById('tool-who-section');
  const who = tool.whoUsesIt || [];

  if (who.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');

  document.getElementById('who-list').innerHTML = who.map(item => {
    if (item.url && item.url.trim() !== '') {
      return `<a
        href="${item.url}"
        class="who-item"
        target="_blank"
        rel="noopener noreferrer"
      >${item.name}</a>`;
    }
    return `<span class="who-item">${item.name}</span>`;
  }).join('');
}

// ============================================================
// D: SCREENSHOT GALLERY
// ============================================================
function renderGallery(screenshots) {
  galleryScreenshots = screenshots || [];
  galleryIndex = 0;

  const section = document.getElementById('tool-gallery-section');

  if (galleryScreenshots.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');

  // Use onclick to replace any previous handlers (prevents stacking)
  document.getElementById('gallery-prev').onclick = galleryPrev;
  document.getElementById('gallery-next').onclick = galleryNext;

  updateGalleryDisplay();
}

function updateGalleryDisplay() {
  const img = document.getElementById('gallery-img');
  const counter = document.getElementById('gallery-counter');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  const current = galleryScreenshots[galleryIndex];
  img.src = current.src;
  img.alt = current.alt || '';

  const total = galleryScreenshots.length;
  counter.textContent = total > 1 ? `${galleryIndex + 1} / ${total}` : '';

  prevBtn.disabled = galleryIndex === 0;
  nextBtn.disabled = galleryIndex === total - 1;

  // Hide prev/next buttons if only one image
  prevBtn.style.visibility = total > 1 ? 'visible' : 'hidden';
  nextBtn.style.visibility = total > 1 ? 'visible' : 'hidden';
}

function galleryPrev() {
  if (galleryIndex > 0) {
    galleryIndex--;
    updateGalleryDisplay();
  }
}

function galleryNext() {
  if (galleryIndex < galleryScreenshots.length - 1) {
    galleryIndex++;
    updateGalleryDisplay();
  }
}

// Keyboard navigation — left/right arrow keys when detail view is active
document.addEventListener('keydown', (e) => {
  const toolView = document.getElementById('view-tool');
  if (!toolView || toolView.classList.contains('hidden')) return;
  if (galleryScreenshots.length <= 1) return;

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    galleryPrev();
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    galleryNext();
  }
});

// ============================================================
// E: VIDEO EMBED
// ============================================================
function renderVideo(url) {
  const section = document.getElementById('tool-video-section');
  const iframe = document.getElementById('tool-video-iframe');

  if (!url || url.trim() === '') {
    section.classList.add('hidden');
    iframe.src = '';
    return;
  }

  section.classList.remove('hidden');
  iframe.src = url;
}

// ============================================================
// F: USE CASES
// ============================================================
function renderUseCases(useCases) {
  const section = document.getElementById('tool-usecases-section');

  if (!useCases || useCases.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  document.getElementById('usecases-list').innerHTML = useCases
    .map(uc => `<li>${uc}</li>`)
    .join('');
}

// ============================================================
// G: NOTES
// ============================================================
function renderNotes(notes) {
  const section = document.getElementById('tool-notes-section');

  if (!notes || notes.trim() === '') {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');
  document.getElementById('notes-block').textContent = notes;
}
