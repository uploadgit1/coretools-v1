// ============================================================
// data.js — Core Tools content
//
// This file is the single source of truth for all tool data.
// Edit this file to add, update, or remove tools.
//
// To add a new tool:
//   1. Copy an existing tool block below
//   2. Fill in all the fields
//   3. Add screenshots to assets/images/tools/{slug}/
//   4. Save this file — changes appear immediately on next push
//
// This is a plain JavaScript file (not JSON) so it loads
// directly in the browser without needing a server. The data
// is assigned to window.TOOLS_DATA and read by app.js.
// ============================================================

window.TOOLS_DATA = {
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
        { "src": "assets/images/tools/claude/home-new-chat.png",            "alt": "Claude desktop home screen",       "caption": "Claude's desktop app home screen with personalised greeting, model selector, and quick-start prompt categories." },
        { "src": "assets/images/tools/claude/web-projects-home.png",        "alt": "Claude Projects home",             "caption": "Claude's web home screen highlighting the Projects feature, with starred and recent chats in the sidebar." },
        { "src": "assets/images/tools/claude/web-conversation-light.jpg",   "alt": "Claude web conversation",          "caption": "A simple back-and-forth conversation in the Claude web interface, showing the chat layout and sidebar in light mode." },
        { "src": "assets/images/tools/claude/web-research-menu.png",        "alt": "Claude feature menu",              "caption": "The feature menu open in Claude's web UI, showing the Research mode toggle alongside web search and Drive options." },
        { "src": "assets/images/tools/claude/web-research-in-progress.png", "alt": "Claude Research mode in progress", "caption": "Claude running a deep research task in real time, showing source count and elapsed time as it builds a report." },
        { "src": "assets/images/tools/claude/web-research-results.png",     "alt": "Claude Research results",          "caption": "Completed research output with a detailed side panel citing 457 sources for a Bay Area offsite planning query." },
        { "src": "assets/images/tools/claude/web-slack-message-draft.png",  "alt": "Claude drafting a Slack message",  "caption": "Claude drafting a Slack message on the user's behalf, demonstrating its tool-use and communication assistance capabilities." },
        { "src": "assets/images/tools/claude/pricing-pro-max-plans.png",    "alt": "Claude Pro and Max pricing plans", "caption": "Side-by-side comparison of Claude's Pro and Max subscription plans and their features." }
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
      "tags": ["developer", "agent"],
      "officialLinks": {
        "website": "https://claude.ai/code",
        "docs": "https://code.claude.com/docs",
        "blog": "https://www.anthropic.com/news",
        "youtube": "",
        "linkedin": "",
        "instagram": ""
      },
      "screenshots": [
        { "src": "assets/images/tools/claude-code/claude-code-local-remote-repo-analysis.jpg",  "alt": "Claude Code repo analysis",           "caption": "Claude Code side-by-side Local terminal and Remote web UI both analysing the same repository." },
        { "src": "assets/images/tools/claude-code/claude-code-desktop-new-session-prompt.png",  "alt": "Claude Code new session",            "caption": "Claude Code desktop app (Code tab) on a blank new session with a prompt ready to enter." },
        { "src": "assets/images/tools/claude-code/claude-code-vscode-extension-unit-tests.png", "alt": "Claude Code writing unit tests",      "caption": "Claude Code VS Code extension writing unit tests for a localisation file inside a project." },
        { "src": "assets/images/tools/claude-code/claude-code-chat-landing-page-preview.png",   "alt": "Claude Code building a landing page", "caption": "Claude Code chat building an HTML landing page with a live preview alongside." },
        { "src": "assets/images/tools/claude-code/claude-code-anywhere-terminal-ide-web.png",   "alt": "Claude Code access modes",            "caption": "Claude Code marketing page showcasing the three access modes: Terminal, IDE extension, and Web." },
        { "src": "assets/images/tools/claude-code/claude-code-desktop-file-write-permission.png","alt": "Claude Code permission prompt",       "caption": "Claude Code requesting permission to write a file — showing how it checks before making changes." }
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
        { "src": "assets/images/tools/midjourney/midjourney-create-image-actions-menu.webp",              "alt": "Midjourney Create tab with image actions",  "caption": "Midjourney Create tab showing a generated image with the full context menu and Creation Actions panel (Vary, Upscale, Animate) open." },
        { "src": "assets/images/tools/midjourney/midjourney-explore-top-day-community-grid.webp",         "alt": "Midjourney Explore community feed",         "caption": "Midjourney Explore tab showing the Top Day community image feed in a masonry grid, viewed before subscribing." },
        { "src": "assets/images/tools/midjourney/midjourney-explore-childrens-book-illustration-batch.webp","alt": "Midjourney batch illustration results",    "caption": "Midjourney Explore tab displaying a batch of AI-generated doodle-style children's book wizard illustrations with their prompts." },
        { "src": "assets/images/tools/midjourney/midjourney-explore-tab-ui-annotated.webp",               "alt": "Midjourney Explore tab annotated",          "caption": "Midjourney Explore tab with annotation boxes highlighting the feed filters, search bar, and Styles/Images/Videos toggles." },
        { "src": "assets/images/tools/midjourney/midjourney-explore-image-detail-download-menu.webp",     "alt": "Midjourney image detail and download menu", "caption": "Midjourney Explore tab with a single image expanded showing the Copy/Report/Download context menu." },
        { "src": "assets/images/tools/midjourney/midjourney-subscription-plans-pricing.webp",             "alt": "Midjourney subscription pricing",           "caption": "Midjourney subscription pricing page comparing Basic ($10), Standard ($30), Pro ($60), and Mega ($120) monthly plans." }
      ],
      "videoEmbedUrl": "",
      "whoUsesIt": [
        { "name": "Widely adopted by marketing agencies", "url": "" },
        { "name": "Used in Fortune 500 creative teams", "url": "" }
      ],
      "useCases": [
        "Concept art and visual exploration",
        "Marketing and social media visuals",
        "Brand asset prototyping",
        "Presentation imagery"
      ],
      "notes": "Commercial use is permitted on paid plans but subject to Midjourney's terms. Ongoing copyright litigation is worth flagging for risk-conscious organisations. Corporate billing is available for 50+ users on yearly Pro/Mega plans.",
      "lastUpdated": "2026-03-15"
    },
    {
      "slug": "harvey",
      "name": "Harvey",
      "vendor": "Harvey AI",
      "category": "Legal & Compliance",
      "shortDescription": "AI platform purpose-built for legal and professional services — research, due diligence, contract analysis, and document review.",
      "bestFor": "Law firms and in-house legal teams that need AI trained on legal workflows, not a general chatbot adapted for legal use.",
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
        { "src": "assets/images/tools/harvey/harvey-contract-review-table.png",  "alt": "Harvey bulk contract review",         "caption": "Harvey's bulk contract review interface displaying force majeure and assignment provision analysis across 20+ documents." },
        { "src": "assets/images/tools/harvey/harvey-draft-legal-memo.png",       "alt": "Harvey drafting a legal memo",        "caption": "Harvey assistant drafting a legal defence memo for a securities trading platform infringement case." },
        { "src": "assets/images/tools/harvey/harvey-assistant-template-library.png","alt": "Harvey template library",          "caption": "Harvey's Assistant template library listing pre-built workflows across General, Transactional, Litigation, and Financial Services." },
        { "src": "assets/images/tools/harvey/harvey-m365-copilot-investor-rights.png","alt": "Harvey in Microsoft 365 Copilot", "caption": "Harvey integrated into Microsoft 365 Copilot, answering a query about investor observer rights on an Advisory Committee." },
        { "src": "assets/images/tools/harvey/harvey-eu-law-wage-analysis.png",   "alt": "Harvey EU employment law analysis",  "caption": "Harvey analysing EU employment law regarding permissible bonus and wage deductions against an uploaded employment agreement." },
        { "src": "assets/images/tools/harvey/harvey-nda-comparison-drafting.png","alt": "Harvey NDA comparison and drafting",  "caption": "Harvey comparing a Cogent–3M NDA against a checklist and generating a table of drafting suggestions." },
        { "src": "assets/images/tools/harvey/harvey-website-homepage.png",       "alt": "Harvey marketing homepage",          "caption": "Harvey's marketing homepage showcasing the Practice Made Perfect tagline and law firm client logos." }
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
};
