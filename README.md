# Requra.AI — Business & Product Presentation

<p align="center">
  <img src="./assets/requra-hero-dark.svg" alt="Requra.AI evidence-grounded requirements intelligence" width="100%" />
</p>

<p align="center">
  <strong>From fragmented project context to traceable, review-ready requirements.</strong>
</p>

<p align="center">
  <a href="https://requra-ai-business-presentation.vercel.app"><strong>Open the live presentation</strong></a>
  &nbsp;·&nbsp;
  <a href="https://requra-demo-rust.vercel.app/demo">Open Requra interactive demo</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Requra/ai-pipeline">AI pipeline</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Requra/frontend">Product frontend</a>
</p>

---

## What this repository is

This repository contains the responsive **Requra.AI business and product presentation** used to explain the product from a business-first perspective while staying grounded in the current Requra repositories.

It is intentionally **not** a technical architecture deck and not a static PowerPoint export. It is an interactive HTML/CSS/JavaScript presentation designed to work as:

- a live full-screen presentation on desktop,
- a responsive vertical story on tablets and phones,
- a shareable Vercel-hosted web experience,
- a printable presentation when needed.

The deck uses Requra's real brand direction and product evidence: Obsidian surfaces, Requra Violet, Cyan accents, actual product screenshots, and the evidence/traceability concepts implemented by the AI pipeline.

## Live deployment

**Production:** https://requra-ai-business-presentation.vercel.app

The project is deployed as a static site on Vercel with clean URLs and no build step.

## Presentation story

The deck is structured as a business narrative rather than a feature dump:

1. **Vision** — what Requra changes
2. **The problem** — fragmented project knowledge
3. **Cost of misunderstanding** — ambiguity → wrong implementation → rework
4. **Requra solution** — capture → understand → structure → validate → review → deliver
5. **Human system** — Stakeholder ↔ Requra ↔ BA/PM → Engineering & QA
6. **Product proof** — real Requra screens and implemented surfaces
7. **Structured outputs** — requirements, stories, acceptance criteria, summaries, coverage and exports
8. **Requra AI** — evidence-grounded intelligence rather than plausible prose
9. **Why e-business** — collaboration, continuity, automation, traceability and scale
10. **STP strategy** — segmentation, targeting and positioning
11. **Competitive position** — manual workflow vs generic AI vs Requra
12. **SWOT** — current strategic assessment
13. **4Ps** — product, price, place and promotion
14. **Business model** — proposed B2B SaaS direction
15. **Go-to-market** — awareness → pilot → adoption → expansion
16. **Business Model Canvas**
17. **Roadmap & close** — current foundation and growth direction

## Current product vs proposed business strategy

The presentation uses a deliberate truth model:

- **Green / “CURRENT PRODUCT”** markers represent behavior supported by the current Requra codebase and repository documentation.
- **Amber / “PROPOSED”** markers represent recommended business strategy such as packaging, monetization or future positioning. They are not presented as already-finalized product facts.

This separation is important: the current repositories establish product capabilities, but they do not establish a finalized commercial pricing model.

## Requra AI concepts featured

The deck keeps the AI explanation business-readable while reflecting the real pipeline:

- multi-source requirements extraction,
- PDF / DOCX / text processing,
- audio transcription when configured,
- requirement deduplication,
- BM25 retrieval,
- optional hybrid/vector retrieval,
- evidence quote grounding,
- classification,
- user-story and acceptance-criteria generation,
- quality validation and bounded repair,
- requirement-to-story coverage,
- traceable source references,
- executive summaries and delivery exports.

See [`assets/traceability-chain.svg`](./assets/traceability-chain.svg) for the evidence chain used by the AI-service documentation.

## Controls

### Desktop

| Input | Action |
| --- | --- |
| `←` / `→` | Previous / next slide |
| `Page Up` / `Page Down` | Previous / next slide |
| Mouse wheel | Navigate slides |
| `O` | Toggle slide overview |
| `F` | Toggle fullscreen |
| `Home` | First slide |
| `End` | Last slide |

### Mobile / tablet

Below the desktop presentation breakpoint, the deck becomes a **natural vertical narrative** instead of shrinking a 16:9 canvas. This prevents unreadable text and keeps cards, diagrams and product screens in normal document flow.

The layout also respects `prefers-reduced-motion`.

## Responsive hardening

The current version includes a layout-system fix for short desktop screens. In particular, the **Engineering & QA** card in the human-system slide is part of the grid flow rather than absolutely positioned, so it cannot collide with the explanatory caption when viewport height is limited.

The presentation is designed for:

- short laptop viewports,
- standard 16:9 desktop displays,
- ultrawide monitors,
- tablets,
- modern mobile devices,
- keyboard navigation and touch/scroll use.

## Brand system

The visual language follows the Requra frontend design tokens:

| Token | Value |
| --- | --- |
| Obsidian | `#030014` |
| Primary Violet | `#7F56D9` |
| Cyan Accent | `#22C3D8` |
| Typeface | Inter / system sans fallback |

The deck intentionally avoids a generic “AI purple template” look. Violet and cyan are used as Requra signals inside an Obsidian product environment.

## Repository structure

```text
.
├── index.html
├── styles.css
├── script.js
├── vercel.json
├── .gitignore
├── README.md
└── assets/
    ├── requra-hero-dark.svg
    ├── traceability-chain.svg
    └── ASSET_SOURCES.md
```

`index.html`, `styles.css`, and `script.js` are intentionally framework-free so the deck opens directly in a browser and deploys as a static site with effectively zero build overhead.

## Run locally

Clone the repository and serve the directory with any static server:

```bash
git clone https://github.com/shawky2002020/requra-ai-business-presentation.git
cd requra-ai-business-presentation
python -m http.server 8080
```

Then open `http://localhost:8080`.

Opening `index.html` directly also works in modern browsers, although a local HTTP server is preferable for presentation testing.

## Product visual assets

The real product screenshots and robot logo displayed in the presentation come from the public `Requra/frontend` repository and are pinned to the audited frontend commit instead of floating on `main`.

Local SVG assets in this repository are copied from the public Requra AI-pipeline documentation for stable README/presentation-support usage. Source details are recorded in [`assets/ASSET_SOURCES.md`](./assets/ASSET_SOURCES.md).

## Source-of-truth policy

Business/product claims in the presentation were reviewed against:

- [`Requra/frontend`](https://github.com/Requra/frontend)
- [`Requra/ai-pipeline`](https://github.com/Requra/ai-pipeline)

The older proposal/MVP documents were treated as historical product intent only when they conflicted with current implementation.

## Tech

- Semantic HTML5
- Modern CSS (Grid, Flexbox, fluid sizing, media queries)
- Vanilla JavaScript
- Canvas hero animation
- CSS transitions / reveal choreography
- Vercel static hosting

No framework or runtime dependency is required.

## Credits

Presentation implementation and business-story adaptation for **Requra.AI**.

Requra product visuals and AI documentation assets remain sourced from the Requra project repositories noted above.
