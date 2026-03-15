# Core Tools — Project Rules

## What this is
A static directory site listing curated enterprise and business tools.
First wave covers AI-focused tools. Long-term vision: coretools.ai.
Hosted on GitHub Pages. Prototype phase: 4 tools, scaling to 30+.

## Tech constraints
- Static site only — no frameworks, no build tools, no backend, no login
- Plain HTML, CSS, and vanilla JavaScript
- All content comes from `assets/data/tools.json`
- Single HTML file (`index.html`) contains both views: homepage and tool detail
- View switching is done in JavaScript, not page navigation

## File roles
- `index.html` — the only HTML file; contains both the homepage and tool detail views
- `assets/css/styles.css` — all styling
- `assets/js/app.js` — homepage logic: data loading, card rendering, search, filter, view switching
- `assets/js/tool.js` — tool detail logic: header, links, gallery, video, use cases, notes
- `assets/data/tools.json` — all tool content (the source of truth)
- `assets/images/tools/{slug}/` — screenshots per tool (1.png, 2.png etc.)

## Design rules
- Light mode only — white and off-white backgrounds, dark text
- Professional and clean — premium enterprise aesthetic, not playful
- System fonts only — no external font loading
- Desktop-first but fully responsive (4 columns → 3 → 2 → 1)
- Accent colour: indigo/purple (#5b21b6 / #7c3aed)
- All asset paths must be relative — no leading slash (important for GitHub Pages sub-path)

## Code standards
- Keep code readable for someone with basic HTML/CSS knowledge
- Semantic HTML — proper headings, landmarks, alt text on all images
- All external links: `target="_blank" rel="noopener noreferrer"`
- All interactive elements must be keyboard accessible
- Visible focus states on all interactive elements
- Sections in the tool detail view hide themselves if their data is empty

## Content tone
- Plain English, practical, concise
- Slightly opinionated — written for business professionals, not developers
- No hype language, no "best ever" style copy
- "Best for" field starts with who the tool suits, not what it does

## Image naming convention
- Screenshots live at: `assets/images/tools/{slug}/1.png`, `2.png`, etc.
- Slug must match the `slug` field in tools.json exactly
- Folder for claude-code uses a hyphen: `assets/images/tools/claude-code/`

## GitHub Pages note
- Site lives at: https://uploadgit1.github.io/coretools-v1/
- Future domain: coretools.ai (not yet configured)
- Never use absolute paths starting with / — they will break on the sub-path

## Do not
- Suggest React, Vue, Next.js, Astro, Tailwind, or any CMS
- Add user accounts, a backend, scraping, or a database
- Add build steps or package managers
- Over-engineer filtering or data loading
