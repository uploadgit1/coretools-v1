# Core Tools v1 — Implementation Plan

---

## 1. Product Summary

Core Tools is a curated, visual directory of important tools that businesses and enterprise teams are actually using in production. The first wave of tools covered happen to be AI-focused, but the long-term vision (coretools.ai) is broader: the core tools that enterprise and business relies on, which increasingly have AI features and extensions.

This is NOT a giant tools database, a marketplace, or a login product.

It is a small, static GitHub Pages website that helps colleagues, managers, and non-technical business professionals quickly understand:

- What a tool is
- What it looks like
- What it is best for
- Which organisations are using it
- Where to go to learn more

The product should feel like a mix of a mini App Store product page, a modern dark-mode software gallery, and a curated executive briefing tool.

**v1 prototype scope:** 4 tools (Claude, Claude Code, Midjourney, Harvey). Architecture supports expansion to 30+ without rewriting.

---

## 2. Recommended Architecture

**Approach:** Single-page application (SPA) behaviour within a single `index.html` file, powered by vanilla JavaScript and a `tools.json` data file.

**Why this is the right choice:**

- GitHub Pages compatible with zero configuration
- No build tools, bundlers, or package managers
- The JSON file acts as the "database" — easy to hand-edit
- A single HTML file with two views (homepage grid + tool detail) means clicking a tool card doesn't navigate away from the page — it swaps the view in place. The browser back button and filter state are preserved naturally.
- Query-string approach (`?slug=claude`) is replaced by in-page view switching. The URL stays clean. If deep-linking to a specific tool becomes important later, we can add hash-based routing (`#claude`) without rewriting anything.
- Code is inspectable, maintainable, and understandable with basic HTML/CSS knowledge.

**Single-page view switching (how it works):**

- The homepage view (hero, filters, card grid) and the tool detail view live in the same HTML file as two `<section>` elements.
- Only one is visible at a time, toggled via a CSS class.
- When a card is clicked, JavaScript hides the homepage view and populates the detail view with that tool's data.
- A "Back to all tools" button returns to the homepage view with filters and scroll position intact.
- No page reload. No navigation. No state loss.

---

## 3. File Structure

```
coretools-v1/
  index.html              ← single HTML file (both views)
  assets/
    css/
      styles.css          ← all styling
    js/
      app.js              ← homepage logic (fetch, render cards, filter, search)
      tool.js             ← tool detail view logic (render detail, gallery, video)
    data/
      tools.json          ← all tool content (the "database")
    images/
      tools/
        claude/
          home-new-chat.png
          web-projects-home.png
          web-conversation-light.jpg
          web-research-results.png
          ... (filenames preserved as captured — see meta.json)
        claude-code/
          claude-code-desktop-new-session-prompt.png
          claude-code-vscode-extension-unit-tests.png
          ... (filenames preserved as captured — see meta.json)
        midjourney/
          midjourney-explore-top-day-community-grid.webp
          midjourney-create-image-actions-menu.webp
          ... (filenames preserved as captured — see meta.json)
        harvey/
          harvey-contract-review-table.png
          harvey-draft-legal-memo.png
          ... (filenames preserved as captured — see meta.json)
      favicon.png         ← simple browser tab icon
  .nojekyll               ← prevents Jekyll processing on GitHub Pages
  PLAN.md                 ← this file
  CLAUDE.md               ← project rules for future Claude Code sessions
  README.md               ← repo description
```

---

## 4. Data Schema

Each tool in `tools.json` is an object in an array. The schema is designed to be easy to hand-edit and extend later without breaking existing entries.

```json
{
  "tools": [
    {
      "slug": "claude",
      "name": "Claude",
      "vendor": "Anthropic",
      "category": "Chat & Research",
      "shortDescription": "AI assistant for writing, analysis, coding, and research tasks across teams.",
      "bestFor": "Teams that need a general-purpose AI assistant with strong reasoning and long-context support.",
      "tags": ["assistant", "enterprise"],
      "officialLinks": {
        "website": "https://claude.ai",
        "docs": "https://docs.anthropic.com",
        "blog": "https://www.anthropic.com/news",
        "youtube": "",
        "linkedin": "",
        "instagram": ""
      },
      "screenshots": [
        {
          "src": "assets/images/tools/claude/home-new-chat.png",
          "alt": "Claude desktop home screen",
          "caption": "Claude's desktop app home screen with personalised greeting, model selector, and quick-start prompt categories."
        },
        {
          "src": "assets/images/tools/claude/web-research-results.png",
          "alt": "Claude Research results",
          "caption": "Completed research output with a detailed side panel citing 457 sources."
        }
      ],
      "videoEmbedUrl": "https://www.youtube-nocookie.com/embed/VIDEO_ID",
      "whoUsesIt": [
        { "name": "Accenture", "url": "" },
        { "name": "Bridgewater", "url": "" },
        { "name": "GitLab", "url": "" }
      ],
      "useCases": [
        "Research and summarisation",
        "Document drafting",
        "Data analysis"
      ],
      "notes": "",
      "lastUpdated": "2026-03-15"
    }
  ]
}
```

**Schema field guide:**

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| slug | Yes | string | URL-safe ID, matches image folder name |
| name | Yes | string | Display name |
| vendor | Yes | string | Company behind the tool |
| category | Yes | string | Must match one of the defined categories |
| shortDescription | Yes | string | 1-2 sentences, plain English |
| bestFor | Yes | string | One clear sentence starting with who it suits |
| tags | No | array of strings | 0-3 lightweight tags, used sparingly |
| officialLinks | Yes | object | Empty string for links that don't exist yet |
| screenshots | Yes | array of objects | Each has `src` (relative path), `alt` (description), and `caption` (one-line label shown below gallery) |
| videoEmbedUrl | No | string | YouTube privacy-enhanced embed URL, empty if none |
| whoUsesIt | Yes | array of objects | Each has `name` and optional `url` for evidence |
| useCases | No | array of strings | Short practical phrases |
| notes | No | string | Risks, governance notes, or editorial commentary |
| lastUpdated | Yes | string | ISO date, for editorial housekeeping |

**Key design decisions:**

- Screenshot paths are **relative** (no leading `/`) so the site works both at `username.github.io/coretools-v1/` and eventually at `coretools.ai`.
- `officialLinks` uses empty strings rather than omitting keys — this makes it simple to fill in later without changing code.
- `whoUsesIt` entries with an empty `url` render as plain text; entries with a URL render as a link. No code changes needed either way.
- `alt` on screenshots means accessibility is built in from day one.
- `caption` provides a one-line description shown below the gallery image — sourced from the tool's `meta.json` file.
- **Screenshot filenames are preserved exactly as captured** (descriptive kebab-case). The first screenshot in the array is used as the card thumbnail. Each tool folder includes a `meta.json` listing filename, alt, and caption for reference.

---

## 5. Page-by-Page UX Plan

### Homepage View

**Layout (top to bottom):**

1. **Compact header bar** — "Core Tools" wordmark on the left. Minimal. No large hero banner — the cards are the hero.

2. **Intro line** — One sentence below the header: something like "A curated directory of the tools that matter. What they do, who uses them, and where to start." Subtle, not shouty.

3. **Filter + search bar** — A single row containing:
   - A search input (searches tool name and description)
   - Category filter pills/buttons (horizontally scrollable on mobile)
   - An "All" pill selected by default
   - Sticky positioning so it remains visible when scrolling through cards

4. **Card grid** — Responsive CSS Grid.
   - Desktop: 4 columns (approximately 8 cards visible on a laptop screen)
   - Tablet: 3 columns
   - Mobile: 1 column (stacked)
   - Cards animate in subtly on load (gentle fade-up)

5. **Footer** — Minimal. "Core Tools" + year. No clutter.

### Tool Card (on homepage)

Each card contains:
- Tool screenshot (first image from screenshots array, used as thumbnail)
- Tool name (prominent)
- Vendor name (subtle, below tool name)
- Category label (small pill/badge)
- Short description (2 lines max, truncated with ellipsis)
- 1-2 tags if they exist (very small, muted)

Clicking anywhere on the card triggers the view switch to the tool detail view.

### Tool Detail View

**Layout (top to bottom):**

1. **Back button** — Top left: "← Back to all tools". Returns to homepage view with filters intact.

2. **Header area**
   - Tool name (large)
   - Vendor
   - Category pill
   - "Best for" line — slightly emphasised, reads like a recommendation
   - Tags (if any), displayed lightly

3. **Official links strip** — Horizontal row of icon-style link buttons (website, docs, blog, YouTube, LinkedIn, Instagram). Only links that exist are rendered. Each opens in a new browser tab. This row acts as a "launch panel" to quickly jump to the tool's own resources.

4. **"Who's Using It" section**
   - Clean horizontal list of company names
   - Names with a URL are clickable links (open in new tab)
   - Names without a URL are plain text
   - Minimal styling — this is a trust signal, not a feature

5. **Screenshot gallery**
   - Large main image display
   - Previous / Next arrow buttons
   - Image counter: "1 / 2"
   - Keyboard accessible (left/right arrow keys)
   - Architected to handle 2-10+ images without code changes (reads from the screenshots array)
   - Clicking an image opens a full-screen lightbox (built in v1)
   - Lightbox closes via ✕ button, click-outside, or Escape key

6. **Video embed** — Below the gallery, full width. YouTube privacy-enhanced embed (`youtube-nocookie.com`). Only rendered if `videoEmbedUrl` is not empty. Clean aspect ratio container (16:9).

7. **Use cases** — If the `useCases` array is not empty, render as a simple list under a "Common use cases" heading.

8. **Notes** — If the `notes` field is not empty, render as a subtle callout block. Good for editorial commentary, risk flags, or governance notes.

---

## 6. Interaction Plan

### Search
- Input field filters cards in real time (on keyup, with a small debounce)
- Searches against: `name`, `vendor`, `shortDescription`, `tags`
- Case-insensitive
- Empty search shows all tools (respecting active category filter)
- Search and category filter work together (intersection — both must match)

### Category Filters
- Rendered as horizontal pill buttons from the categories present in the data
- "All" is the default active state
- Clicking a category highlights that pill and filters the grid
- Clicking "All" resets to show everything
- Combined with search: if a search term is active and a category is selected, only tools matching both are shown
- Filter state is preserved when returning from tool detail view

### Card Click → Tool Detail
- Clicking a card hides the homepage view section, shows the tool detail section
- JavaScript populates the detail view from the clicked tool's data in the JSON
- Scroll position on the homepage is saved and restored on return
- No page reload — instant transition

### Back Button
- Prominent "← Back to all tools" button at the top of the detail view
- Returns to the homepage view with filters, search, and scroll position intact
- The browser back button should also work (achieved via `history.pushState` with hash routing)

### Screenshot Gallery
- Left/right arrow buttons cycle through screenshots
- Keyboard: left/right arrow keys also cycle when gallery is focused
- Image counter updates ("1 / 2", "2 / 2")
- Handles any number of images from the array (2 now, 6+ later)
- Images load lazily if more than 2

### Video Embed
- Standard YouTube iframe with `youtube-nocookie.com` for privacy
- 16:9 responsive aspect ratio container
- Only rendered if `videoEmbedUrl` is not empty in the data

### Deep Linking (lightweight, v1)
- When a tool detail view is shown, update the URL hash: `#claude`
- On page load, if a hash is present, auto-open that tool's detail view
- This allows sharing links to specific tools without any server-side routing

---

## 7. Styling System

### Colour Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background (page) | `#0a0a0f` | Main body background |
| Background (card/surface) | `#12121a` | Cards, panels, detail sections |
| Background (elevated) | `#1a1a28` | Hover states, active filters, gallery |
| Border (subtle) | `#ffffff08` | Card borders, dividers |
| Border (hover) | `#ffffff15` | Card hover state |
| Text (primary) | `#e8e8f0` | Headings, tool names |
| Text (secondary) | `#8888a8` | Descriptions, metadata |
| Text (muted) | `#55556a` | Timestamps, subtle labels |
| Accent (primary) | `#a78bfa` | Category pills, links, active states |
| Accent (glow) | `#a78bfa25` | Subtle glow/shadow behind accent elements |
| Green (status) | `#4ade80` | "Last updated" indicators, positive signals |
| White | `#ffffff` | Sparingly — used for the most important headings |

### Typography

- **Font stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif` (system fonts for speed, no external font loading)
- **Base size:** 16px
- **Scale:** Tool name on detail page: 2rem. Card title: 1.1rem. Body text: 1rem. Metadata/labels: 0.8rem.
- **Line height:** 1.5 for body text, 1.2 for headings
- **Letter spacing:** -0.02em on headings for a tighter, modern feel
- **Weight:** 400 for body, 600 for headings, 700 for the tool name on detail view

### Spacing System

Use a consistent 8px base unit:
- `0.5rem` (8px) — tight gaps (between tag pills)
- `1rem` (16px) — standard padding within components
- `1.5rem` (24px) — spacing between content blocks
- `2rem` (32px) — section separation
- `3rem` (48px) — major section breaks (e.g., between gallery and video)

### Card Style

- Background: `#12121a`
- Border: 1px solid `#ffffff08`
- Border-radius: 12px
- Padding: 0 (image bleeds to edges at top) + 1.25rem padding for text area
- Hover: border lightens to `#ffffff15`, subtle translateY(-2px) lift, soft shadow
- Transition: 0.2s ease
- Cursor: pointer on hover
- Screenshot thumbnail at top: aspect-ratio 16/10, object-fit cover

### Button / Pill Style

- Category pills: background `#a78bfa18`, border 1px solid `#a78bfa40`, text `#a78bfa`, border-radius 999px, padding 0.35rem 0.9rem
- Active pill: background `#a78bfa30`, brighter text
- Back button: text-style with arrow, no heavy button styling
- Official link buttons: small icon + label, subtle background, hover brightens

### Layout Rhythm

- Max content width: 1200px, centered
- Card grid gap: 1.5rem
- Page horizontal padding: 2rem (desktop), 1rem (mobile)

---

## 8. Build Sequence

The build is broken into safe, small steps. Each step produces something visible and testable.

### Step 1 — Data foundation
- Create the folder structure (`assets/css/`, `assets/js/`, `assets/data/`, `assets/images/tools/`)
- Write `tools.json` with seed data for the 4 tools (placeholder image paths and video URLs)
- This is the source of truth — everything else renders from it

### Step 2 — HTML skeleton
- Write `index.html` with both views stubbed out:
  - Homepage view section (header, filter bar placeholder, card grid container)
  - Tool detail view section (hidden by default)
- Link `styles.css`, `app.js`, and `tool.js`
- Add favicon link
- Add meta tags (charset, viewport, description)

### Step 3 — Homepage JavaScript (app.js)
- Fetch `tools.json`
- Render tool cards into the grid from the data
- Implement category filter pills (generated from the categories found in the data)
- Implement search input with real-time filtering
- Combined filter logic (search + category)

### Step 4 — Tool detail JavaScript (tool.js)
- View switching: card click hides homepage, shows detail
- Populate detail view from the tool's data
- Back button returns to homepage with state preserved
- Hash routing: update URL hash on tool open, read hash on page load
- Official links strip (only show links that exist)
- "Who's Using It" list
- Screenshot gallery with prev/next and keyboard nav
- Video embed (conditionally rendered)
- Use cases and notes sections (conditionally rendered)

### Step 5 — Styling (styles.css)
- Dark theme foundation (backgrounds, text colours, base typography)
- Header and intro styling
- Filter bar and pill styling (with sticky position)
- Card grid layout (responsive: 4 → 3 → 1 columns)
- Card component styling (thumbnail, text, hover effects)
- Tool detail page layout
- Gallery styling (main image, arrows, counter)
- Video embed responsive container
- Official links strip
- "Who's Using It" section
- Footer
- Focus states and accessibility highlights
- Smooth transitions and subtle animations

### Step 6 — Screenshots and content
- Drop real screenshot files into `assets/images/tools/{slug}/`
- Update `tools.json` with real descriptions, links, and "Who's Using It" data
- Swap placeholder video embed URLs for real ones

### Step 7 — Polish and QA
- Test all interactive elements (search, filter, gallery, back button, hash routing)
- Test keyboard navigation
- Test responsive layout (desktop, tablet, mobile)
- Verify all external links open in new tabs with `rel="noopener noreferrer"`
- Check alt text renders correctly
- Check the site works at the GitHub Pages URL (relative path correctness)
- Performance check: ensure images aren't oversized

### Step 8 — Push live
- Commit and push via GitHub Desktop
- Verify at `https://uploadgit1.github.io/coretools-v1/`

---

## 9. Prototype-First Recommendations

**Build for v1 (4 tools):**
- Full homepage with cards, search, category filter
- Full tool detail view with all sections
- Screenshot gallery with prev/next and keyboard support
- Video embed
- Hash-based deep linking
- Responsive layout
- Dark theme fully applied
- Real content for all 4 tools

**Defer to v2 (when expanding to 30 tools):**
- Sort options (alphabetical, recently updated)
- "Featured tools" section on homepage
- Saved favourites (localStorage)
- ~~Lightbox for screenshot zoom~~ *(built in v1)*
- Related tools suggestions
- Risk/governance badges
- More advanced tag filtering
- WebP image conversion
- Custom domain (coretools.ai) configuration

---

## 10. Risks and Gotchas

**Relative paths matter.** The site lives at `uploadgit1.github.io/coretools-v1/`, not at the root. All asset paths in HTML and JSON must be relative (e.g., `assets/images/...` not `/assets/images/...`). Absolute paths starting with `/` will break on GitHub Pages because they resolve to the domain root, not the repo root.

**GitHub Pages caching.** GitHub Pages can aggressively cache files. If you push changes and don't see them, try a hard refresh (Cmd + Shift + R on Mac). For persistent issues, GitHub Pages can take 2-5 minutes to update.

**Image file sizes.** Large PNG screenshots will slow the page down. Keep screenshots under 300KB each if possible. Later, convert to WebP for better compression.

**YouTube embed privacy.** Use `youtube-nocookie.com` instead of `youtube.com` for embeds. This avoids setting tracking cookies on your visitors.

**No server-side routing.** GitHub Pages serves static files only. You cannot use clean URLs like `/tools/claude` — those would return a 404. Hash routing (`#claude`) or query strings (`?slug=claude`) are the GitHub Pages-friendly alternatives. We're using hash routing.

**Jekyll interference.** The `.nojekyll` file is already in place. Without it, GitHub Pages would ignore folders starting with underscores and process files through Jekyll unnecessarily.

**Browser back button.** Because we're switching views in a single page, we need `history.pushState` to make the browser back button work naturally. Without it, pressing back would leave the site entirely instead of returning to the homepage view.

**CORS on local development.** If you open `index.html` directly as a file in your browser (`file:///...`), the fetch to `tools.json` will fail due to browser security restrictions. You can either use a simple local server (`python3 -m http.server` in terminal) or just test via GitHub Pages after pushing. I'll include a note on this.

---

## 11. Suggested CLAUDE.md

```markdown
# Core Tools — Project Rules

## What this is
A static directory site for curated enterprise tools. Hosted on GitHub Pages.

## Tech constraints
- Static site only: no frameworks, no build tools, no backend
- Plain HTML, CSS, and vanilla JavaScript
- Data comes from `assets/data/tools.json`
- Single-page app: `index.html` contains both the homepage and tool detail views

## Design rules
- Dark mode only, modern and restrained
- Premium feel, not playful
- Readable typography using system fonts
- Desktop-first but fully responsive

## Code standards
- Keep code simple enough for someone with basic HTML/CSS knowledge to read
- Semantic HTML (proper headings, landmarks, alt text)
- All external links: target="_blank" rel="noopener noreferrer"
- Keyboard-accessible interactive elements
- Visible focus states on all interactive elements
- All asset paths must be relative (no leading /)

## File roles
- index.html — the single HTML file (homepage + detail views)
- assets/css/styles.css — all styling
- assets/js/app.js — homepage logic (cards, search, filter)
- assets/js/tool.js — tool detail view logic (gallery, video, back nav)
- assets/data/tools.json — all tool content
- assets/images/tools/{slug}/ — screenshots per tool

## Content tone
- Practical, plain English, concise
- Slightly opinionated but not hype-driven
- Written for business professionals, not developers
```

---

## 12. Seed Content — tools.json

```json
{
  "tools": [
    {
      "slug": "claude",
      "name": "Claude",
      "vendor": "Anthropic",
      "category": "Chat & Research",
      "shortDescription": "AI assistant built for thoughtful work — writing, analysis, coding, research, and long-document tasks across teams.",
      "bestFor": "Teams that need a reliable general-purpose AI assistant with strong reasoning, long context windows, and enterprise-grade privacy controls.",
      "tags": ["assistant", "enterprise"],
      "officialLinks": {
        "website": "https://claude.ai",
        "docs": "https://docs.anthropic.com",
        "blog": "https://www.anthropic.com/news",
        "youtube": "https://www.youtube.com/@anthropic-ai",
        "linkedin": "https://www.linkedin.com/company/anthropicresearch",
        "instagram": ""
      },
      "screenshots": [
        { "src": "assets/images/tools/claude/home-new-chat.png", "alt": "Claude desktop home screen", "caption": "Claude's desktop app home screen with personalised greeting, model selector, and quick-start prompt categories." },
        { "src": "assets/images/tools/claude/web-research-results.png", "alt": "Claude Research results", "caption": "Completed research output with a detailed side panel citing 457 sources." }
      ],
      "videoEmbedUrl": "",
      "whoUsesIt": [
        { "name": "Accenture", "url": "" },
        { "name": "Bridgewater", "url": "" },
        { "name": "GitLab", "url": "https://about.gitlab.com/gitlab-duo/" },
        { "name": "Notion", "url": "" }
      ],
      "useCases": [
        "Research and summarisation",
        "Document drafting and editing",
        "Data analysis and reasoning",
        "Code review and generation"
      ],
      "notes": "Claude Enterprise includes SSO, admin controls, and a commitment that customer data is not used for model training. SOC 2 Type II and ISO 27001 certified.",
      "lastUpdated": "2026-03-15"
    },
    {
      "slug": "claude-code",
      "name": "Claude Code",
      "vendor": "Anthropic",
      "category": "Developer & Coding",
      "shortDescription": "Agentic coding tool that runs in the terminal. Handles multi-file edits, debugging, refactors, and build tasks across full codebases.",
      "bestFor": "Development teams that want an AI agent embedded directly in their workflow — not just autocomplete, but autonomous multi-step coding tasks.",
      "tags": ["developer", "agent", "CLI"],
      "officialLinks": {
        "website": "https://claude.ai/code",
        "docs": "https://code.claude.com/docs",
        "blog": "https://www.anthropic.com/news",
        "youtube": "",
        "linkedin": "",
        "instagram": ""
      },
      "screenshots": [
        { "src": "assets/images/tools/claude-code/claude-code-desktop-new-session-prompt.png", "alt": "Claude Code new session prompt", "caption": "Claude Code desktop app on a blank new session ready to receive a task." },
        { "src": "assets/images/tools/claude-code/claude-code-vscode-extension-unit-tests.png", "alt": "Claude Code writing unit tests in VS Code", "caption": "Claude Code VS Code extension writing unit tests for a localisation file." }
      ],
      "videoEmbedUrl": "",
      "whoUsesIt": [
        { "name": "Accenture", "url": "" },
        { "name": "Anthropic (internal)", "url": "" }
      ],
      "useCases": [
        "Multi-file code refactoring",
        "Debugging and test generation",
        "Build and deployment automation",
        "Codebase exploration and documentation"
      ],
      "notes": "Announced February 2025 alongside Claude 3.7 Sonnet. Relatively new but already deployed at scale in enterprise environments.",
      "lastUpdated": "2026-03-15"
    },
    {
      "slug": "midjourney",
      "name": "Midjourney",
      "vendor": "Midjourney Inc.",
      "category": "Image & Design",
      "shortDescription": "AI image generation platform used for creative concepts, branding assets, marketing visuals, and rapid visual prototyping.",
      "bestFor": "Creative and marketing teams that need high-quality generated imagery for concepts, campaigns, and visual exploration.",
      "tags": ["creative", "image generation"],
      "officialLinks": {
        "website": "https://www.midjourney.com",
        "docs": "https://docs.midjourney.com",
        "blog": "",
        "youtube": "",
        "linkedin": "",
        "instagram": ""
      },
      "screenshots": [
        { "src": "assets/images/tools/midjourney/midjourney-create-image-actions-menu.webp", "alt": "Midjourney Create tab with image actions", "caption": "Midjourney Create tab showing a generated image with the full context menu and Creation Actions panel open." },
        { "src": "assets/images/tools/midjourney/midjourney-explore-top-day-community-grid.webp", "alt": "Midjourney Explore community feed", "caption": "Midjourney Explore tab showing the Top Day community image feed in a masonry grid." }
      ],
      "videoEmbedUrl": "",
      "whoUsesIt": [
        { "name": "Disney (reported usage)", "url": "" },
        { "name": "Marketing agencies (widely adopted)", "url": "" }
      ],
      "useCases": [
        "Concept art and visual exploration",
        "Marketing and social media visuals",
        "Brand asset prototyping",
        "Presentation imagery"
      ],
      "notes": "Commercial use is permitted on paid plans but subject to Midjourney's terms. Ongoing copyright litigation (Disney/Universal) is worth noting for risk-conscious organisations. Corporate billing is available for 50+ users on yearly Pro/Mega plans.",
      "lastUpdated": "2026-03-15"
    },
    {
      "slug": "harvey",
      "name": "Harvey",
      "vendor": "Harvey AI",
      "category": "Legal & Compliance",
      "shortDescription": "AI platform built specifically for legal and professional services — research, due diligence, contract analysis, and document review.",
      "bestFor": "Law firms and in-house legal teams that need AI trained on legal workflows, not a general chatbot repurposed for legal work.",
      "tags": ["legal", "professional services"],
      "officialLinks": {
        "website": "https://www.harvey.ai",
        "docs": "",
        "blog": "https://www.harvey.ai/blog",
        "youtube": "",
        "linkedin": "https://www.linkedin.com/company/harvey-ai",
        "instagram": ""
      },
      "screenshots": [
        { "src": "assets/images/tools/harvey/harvey-contract-review-table.png", "alt": "Harvey bulk contract review interface", "caption": "Harvey's bulk contract review interface displaying force majeure and assignment provision analysis across 20+ documents." },
        { "src": "assets/images/tools/harvey/harvey-draft-legal-memo.png", "alt": "Harvey drafting a legal memo", "caption": "Harvey assistant drafting a legal defence memo for a securities trading platform infringement case." }
      ],
      "videoEmbedUrl": "",
      "whoUsesIt": [
        { "name": "A&O Shearman", "url": "https://www.harvey.ai/customers" },
        { "name": "100,000+ lawyers across 1,000+ organisations", "url": "https://www.harvey.ai/customers" }
      ],
      "useCases": [
        "Legal research",
        "Due diligence",
        "Contract analysis and review",
        "Document drafting"
      ],
      "notes": "Harvey is purpose-built for legal — not a general AI assistant with a legal plugin. Strong traction with major global law firms.",
      "lastUpdated": "2026-03-15"
    }
  ]
}
```

---

## Categories (v1 system)

For the initial 4 tools and future expansion to 30:

| Category | Covers |
|----------|--------|
| Chat & Research | General AI assistants, knowledge tools, enterprise search |
| Developer & Coding | IDEs, coding agents, code intelligence, DevOps AI |
| Image & Design | Image generation, design tools, creative AI |
| Video & Audio | Video generation, voice synthesis, media AI |
| Writing & Docs | Document AI, content generation, editing tools |
| Automation & Ops | Workflow automation, iPaaS, agent platforms |
| Customer & Sales | CRM AI, support AI, revenue intelligence |
| Legal & Compliance | Legal AI, contract management, compliance |
| Data & Infrastructure | Cloud AI platforms, vector databases, ML infrastructure |

These categories are broad enough to avoid over-splitting but specific enough that filtering feels useful. As tools are added, the filter bar auto-generates from whatever categories appear in the data — no hardcoded list.

---

## Summary

This plan gives you the simplest possible stack that still looks premium and works well. Four files do all the work (HTML, CSS, two JS files) powered by one JSON file. Every piece of content is editable by hand. The architecture scales cleanly from 4 tools to 50 without structural changes.

Ready to build on your approval.
