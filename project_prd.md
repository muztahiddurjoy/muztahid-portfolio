# Product Requirements Document — Personal Portfolio Platform

**Project codename:** The Full-Stack Innovator
**Document version:** 1.0
**Status:** Draft for implementation
**Stack:** Next.js (App Router) · Payload CMS 3.x · MongoDB Atlas · Vercel

> **Placeholders to fill before launch:** `[Your Name]`, `[Target Field]` (e.g. Robotics & Autonomous Systems / AI / Systems Engineering), `[Email]`, GitHub/LinkedIn URLs, and final domain. These appear throughout and should be driven by CMS content, not hardcoded.

---

## 1. Overview

### 1.1 Purpose
This document specifies the requirements for a custom-built personal portfolio platform that serves a dual purpose:

1. **A Master's application asset** — academically rigorous, structured for admissions committees to quickly assess depth, leadership, and trajectory.
2. **A living personal brand** — fast, technical, and action-oriented; the build itself is proof of software competence before a single word is read.

The site sits at the intersection of hardware and software engineering — autonomous robotics, scalable cloud infrastructure, and startup competition experience — and its energy should reflect that of a builder who ships real systems.

### 1.2 Why this stack
| Decision | Rationale |
|---|---|
| **Next.js (App Router)** | Server components for instant first paint, file-based routing for case-study pages, first-class SEO control. Silently demonstrates frontend skill. |
| **Payload CMS 3.x** | Runs natively inside the Next.js app (same repo, same deploy). Content is managed through a typed admin panel instead of being hardcoded, so projects/awards/skills can be updated without redeploying. TypeScript-first, which matches an engineering audience. |
| **MongoDB Atlas** | Already part of the candidate's stack (MongoDB experience is a listed skill). Pairs with Payload's Mongoose adapter. |
| **Vercel** | Already used for deployments. Zero-config Next.js hosting; the build pipeline itself is part of the story. |

### 1.3 Design philosophy
**Clean, highly technical, fast, action-oriented.** Dark-mode aesthetic (slate or deep blue) with restrained, purposeful motion. Every animation must earn its place; nothing should delay content or harm Core Web Vitals.

---

## 2. Goals & success metrics

### 2.1 Primary goals
- Communicate identity and intent within the first 5 seconds of a visit.
- Make technical depth legible to both **technical** (recruiters, faculty) and **semi-technical** (admissions officers) audiences.
- Demonstrate software craftsmanship implicitly through performance and polish.
- Provide a frictionless path to the CV, project repositories, and contact.

### 2.2 Success metrics
| Metric | Target |
|---|---|
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | 100 |
| Largest Contentful Paint (LCP) | < 2.0s on 4G |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to first hero render | < 1.0s (text loads before background animation) |
| CV download / contact-form conversion | Tracked via analytics events |

---

## 3. Target audience & personas

### Persona A — The Admissions Officer
Scans dozens of applicants. Semi-technical. Needs to quickly verify trajectory, leadership, communication ability, and a clear research/study motivation. **Cares about:** the narrative, the awards timeline, the "why study abroad" pitch.

### Persona B — The Recruiter / Faculty Reviewer
Technical. Will inspect the actual architecture and repositories. **Cares about:** the project deep-dives, the tech stack, how hardware and software were bridged.

### Persona C — The Content Editor (the candidate)
Owns the site. Must be able to add a project, award, or skill in minutes through the Payload admin panel — no code, no redeploy for content changes.

---

## 4. Information architecture

```
/                       → Landing (Hero + section anchors, single-page scroll)
  #projects             → Projects Matrix (filterable grid)
  #skills               → Skills ecosystem
  #timeline             → Awards, competitions & leadership
  #about                → About & contact
/projects/[slug]        → Project deep-dive case study (dedicated route)
/admin                  → Payload CMS admin panel (auth-gated)
/api/[...]              → Payload REST/local API + form submission endpoint
/cv                     → (optional) inline CV viewer; CV file also downloadable
sitemap.xml, robots.txt → Generated for SEO
```

The home page is a **single scrolling experience** with anchored sections; project case studies are the only content that lives on dedicated routes (for shareability and SEO).

---

## 5. Functional requirements

### 5.1 Hero section — "The Hook"
**Intent:** Instantly communicate identity and goal.

- **FR-1.1** Minimalist, bold, full-viewport landing screen with a dark-mode aesthetic (slate / deep blue).
- **FR-1.2** Subtle, tech-inspired animated background (e.g. a slowly rotating 3D point-cloud or a low-opacity animated grid). The animation must be GPU-light, pause when off-screen / on `prefers-reduced-motion`, and **never block headline render**.
- **FR-1.3** Headline (CMS-driven): e.g. *"Bridging Autonomous Robotics & Scalable Software."*
- **FR-1.4** Sub-headline (CMS-driven): e.g. *"Engineering intelligent systems from hardware to the cloud. Currently seeking Master's opportunities in `[Target Field]`."*
- **FR-1.5** Two CTAs: **View My Projects** (primary, scrolls/links to grid) and **Download Academic CV** (secondary, serves the CMS-uploaded CV file).
- **FR-1.6** Headline and CTAs are server-rendered so they appear immediately; the background hydrates after.

### 5.2 Projects Matrix — "The Core Engine"
**Intent:** The most critical section. Categorize work so reviewers aren't overwhelmed.

- **FR-2.1** Filterable grid of project cards.
- **FR-2.2** Category filters (CMS-defined enum): **Robotics & Autonomous Systems**, **Cloud & Web Infrastructure**, **Hardware Engineering**. Include an "All" default.
- **FR-2.3** Selecting a filter re-sorts/filters the grid smoothly (animated, client-side, no full reload).
- **FR-2.4** On card hover (and tap-equivalent on touch), reveal a quick **tech-stack row** (e.g. ZED SDK, ESP32, AWS, MongoDB) and a **success metric**.
- **FR-2.5** Clicking a card opens a dedicated **case-study page** at `/projects/[slug]`.
- **FR-2.6** Case-study pages **must** follow this fixed structure (for academic legibility):
  1. **The Problem** — what was the challenge?
  2. **The Architecture** — how the microcontrollers / motor drivers were bridged with higher-level logic.
  3. **The Code / Repo** — direct links to GitHub / Appbaksho repositories.
  4. **The Result** — outcome and metric (e.g. *Winning the WICE Gold Medal*).
- **FR-2.7** Case-study pages support rich content: formatted text, code blocks, an image gallery, and architecture diagrams.
- **FR-2.8** Each case study has its own meta title/description and Open Graph image for clean link sharing.

### 5.3 Skills ecosystem — "Under the Hood"
**Intent:** Show how skills connect, not a flat bulleted list.

- **FR-3.1** Interactive skill ecosystem grouped into visual clusters:
  - **Hardware & Perception** (Arduino, C++, stereo cameras, sensors)
  - **Software & Backend** (Java, Python, MongoDB)
  - **DevOps & Deployment** (Vercel, AWS)
- **FR-3.2** Hovering a tool highlights the projects (in the grid below or via a connecting visual) where that tool was used. This relationship is data-driven (skill ↔ project relationship in the CMS).
- **FR-3.3** Touch-friendly fallback: tapping a tool surfaces its related projects.

### 5.4 Awards, competitions & leadership
**Intent:** Demonstrate leadership, communication, and business acumen — not just coding.

- **FR-4.1** Chronological, scrolling timeline.
- **FR-4.2** As the user scrolls, milestones animate in from the sides (respecting `prefers-reduced-motion`).
- **FR-4.3** Featured entries include: **World Invention Competition and Exhibition (WICE) Gold Medal**, **Future of Capitalism Startup Competition**, and robotics club / **Mongol-Tori** involvement.
- **FR-4.4** Each milestone: title, organization, date, short description, optional image, optional external link, and a category tag (Award / Competition / Leadership).
- **FR-4.5** Timeline order is driven by date (with a manual override field for fine control).

### 5.5 About & contact — "The Mission"
**Intent:** The direct pitch for a Master's program.

- **FR-5.1** Two-column layout: left = professional, approachable photo (lab / rover / pitching); right = narrative.
- **FR-5.2** Punchy narrative (CMS-driven) explaining the motivation to study abroad and the specific problem in AI / robotics / systems engineering the candidate wants to solve next.
- **FR-5.3** A simple, frictionless contact form (name, email, message) with validation and spam protection.
- **FR-5.4** Form submissions are stored in the CMS and trigger an email notification to `[Email]`.
- **FR-5.5** Direct links to GitHub and LinkedIn.

### 5.6 Global / cross-cutting
- **FR-6.1** Sticky or scroll-aware navigation with anchor links to each section.
- **FR-6.2** Fully responsive (mobile-first); all hover interactions have touch equivalents.
- **FR-6.3** Dark mode is the default and primary aesthetic.
- **FR-6.4** All content sections render meaningful HTML server-side for SEO and crawlability.

---

## 6. Content model (Payload CMS)

Payload content is split into **Globals** (single-instance, site-wide settings) and **Collections** (repeatable entries). Field names below are indicative.

### 6.1 Globals

**`site-settings`**
| Field | Type | Notes |
|---|---|---|
| `siteName` | text | Used in metadata |
| `defaultMetaTitle` | text | SEO fallback |
| `defaultMetaDescription` | textarea | SEO fallback |
| `defaultOgImage` | upload (media) | Social share fallback |
| `githubUrl` | text | |
| `linkedinUrl` | text | |
| `cvFile` | upload (media) | Academic CV PDF served by the download CTA |

**`hero`**
| Field | Type | Notes |
|---|---|---|
| `headline` | text | e.g. "Bridging Autonomous Robotics & Scalable Software." |
| `subHeadline` | textarea | Includes the `[Target Field]` line |
| `primaryCtaLabel` | text | Default "View My Projects" |
| `secondaryCtaLabel` | text | Default "Download Academic CV" |
| `backgroundVariant` | select | `point-cloud` \| `grid` \| `none` |

**`about`**
| Field | Type | Notes |
|---|---|---|
| `photo` | upload (media) | Lab / rover / pitch photo |
| `narrative` | richText | The Master's pitch |
| `missionStatement` | textarea | Optional short tagline |
| `contactEmail` | text | Destination for form notifications |

### 6.2 Collections

**`projects`**
| Field | Type | Notes |
|---|---|---|
| `title` | text | required |
| `slug` | text | unique, auto-generated from title |
| `category` | select | `robotics` \| `cloud` \| `hardware` (drives filters) |
| `summary` | textarea | Card-level one-liner |
| `successMetric` | text | Shown on hover (e.g. "WICE Gold Medal") |
| `techStack` | relationship → `skills` (hasMany) | Powers the hover tech-stack row and skill↔project linking |
| `problem` | richText | Case-study section 1 |
| `architecture` | richText | Case-study section 2 (hardware↔software bridge) |
| `repoLinks` | array of `{ label, url }` | GitHub / Appbaksho |
| `result` | richText | Case-study section 4 |
| `featuredImage` | upload (media) | Card + case-study hero |
| `gallery` | array of upload (media) | Case-study images / diagrams |
| `order` | number | Manual sort override |
| `featured` | checkbox | Optional homepage highlight |

**`skills`**
| Field | Type | Notes |
|---|---|---|
| `name` | text | e.g. "ZED SDK", "ESP32", "Python" |
| `cluster` | select | `hardware-perception` \| `software-backend` \| `devops-deployment` |
| `icon` | upload (media) | Optional logo/icon |
| Related projects | join / reverse relationship | Derived from `projects.techStack`; used to highlight projects on hover |

**`awards`**
| Field | Type | Notes |
|---|---|---|
| `title` | text | e.g. "WICE Gold Medal" |
| `organization` | text | |
| `date` | date | Drives chronological order |
| `category` | select | `award` \| `competition` \| `leadership` |
| `description` | textarea | |
| `image` | upload (media) | Optional |
| `link` | text | Optional external link |
| `orderOverride` | number | Optional manual ordering |

**`media`**
Standard Payload uploads collection (images, CV PDF, icons). With Vercel's ephemeral filesystem, media must be backed by **cloud storage** — see §7.3.

**`form-submissions`** (via Form Builder plugin)
Stores contact-form entries; see §5.5 and §7.4.

### 6.3 Recommended Payload plugins
- `@payloadcms/plugin-seo` — per-document meta title/description/OG fields for projects and globals.
- `@payloadcms/plugin-form-builder` — contact form definition, submission storage, and email-on-submit.
- `@payloadcms/storage-s3` (or Vercel Blob adapter) — durable media storage on serverless hosting.

---

## 7. Technical architecture & non-functional requirements

### 7.1 Architecture summary
A single Next.js App Router project with Payload 3.x mounted inside it. The frontend reads content via Payload's **Local API** (direct database access during server rendering — no network round-trip) for maximum performance, falling back to the REST/GraphQL API only where client-side fetching is needed (e.g. the filterable grid can be fully server-rendered, with filtering handled client-side over already-loaded data).

```
┌─────────────────────────── Vercel ───────────────────────────┐
│  Next.js App Router                                           │
│  ├─ Public site (RSC)  ──Local API──┐                         │
│  ├─ /admin (Payload UI)             │                         │
│  └─ /api (Payload + form endpoint)  │                         │
└──────────────────────────────────────┼───────────────────────┘
                                        │
                          ┌─────────────▼───────────┐   ┌──────────────┐
                          │   MongoDB Atlas          │   │  S3 / Blob   │
                          │   (content + submissions)│   │  (media, CV) │
                          └──────────────────────────┘   └──────────────┘
```

### 7.2 Performance
- **NFR-1** Server-render all primary content; ship minimal client JS. Hydrate interactive islands (background animation, grid filter, skill hover) only.
- **NFR-2** Hero headline + CTAs must paint before the background animation initializes.
- **NFR-3** Optimize all images via `next/image`; serve modern formats; lazy-load below-the-fold media.
- **NFR-4** Meet the §2.2 Core Web Vitals targets.

### 7.3 Hosting & storage caveat (important)
Vercel's serverless filesystem is **ephemeral**, so Payload's default local-disk media storage will not persist. Media uploads and the CV file **must** use an external store (AWS S3 — already in the candidate's stack — or Vercel Blob) via the appropriate storage adapter. MongoDB Atlas (not a local Mongo) is required for the same reason.

### 7.4 Contact form & email
- Use the Form Builder plugin to define the contact form and persist submissions.
- Configure Payload's email (e.g. an SMTP provider or Resend) to send a notification to `[Email]` on each submission.
- Add spam mitigation (honeypot field and/or a lightweight CAPTCHA).

### 7.5 SEO
- **NFR-5** Per-page meta titles/descriptions and Open Graph/Twitter cards (project pages especially).
- **NFR-6** Generate `sitemap.xml` and `robots.txt`.
- **NFR-7** Add JSON-LD `Person` structured data (name, role, sameAs links to GitHub/LinkedIn) on the home page.
- **NFR-8** Semantic, crawlable HTML for every content section.

### 7.6 Accessibility
- **NFR-9** WCAG 2.1 AA: sufficient color contrast (verify the dark palette), full keyboard navigation, visible focus states, and `alt` text on all images.
- **NFR-10** Respect `prefers-reduced-motion` for the hero background and timeline animations.
- **NFR-11** Every hover-triggered interaction has a touch/keyboard-accessible equivalent.

### 7.7 Security & operations
- **NFR-12** Payload admin protected by authentication; restrict to the owner.
- **NFR-13** Secrets (DB URI, S3 keys, email keys, `PAYLOAD_SECRET`) in environment variables, never committed.
- **NFR-14** Privacy-respecting analytics (e.g. Vercel Analytics / Plausible) tracking CV downloads and contact-form conversions.

### 7.8 Browser & device support
- **NFR-15** Latest two versions of Chrome, Safari, Firefox, and Edge; iOS Safari and Android Chrome. Graceful degradation of the 3D background on low-power devices.

---

## 8. Design system

| Element | Direction |
|---|---|
| **Mode** | Dark-first; slate / deep blue base |
| **Accent** | A single confident accent color for CTAs, filter-active states, and links |
| **Typography** | One clean technical sans (e.g. a geometric/grotesque) for headings; highly legible body face; monospace for code/tech-stack chips |
| **Motion** | Subtle, purposeful, reduced-motion aware; nothing blocks content |
| **Spacing** | Generous whitespace; grid-aligned; "engineered" feel |
| **Imagery** | Real lab/rover/competition photos over stock |

> Optional: align with a documented design-token set during build to keep colors, type scale, and spacing consistent across components.

---

## 9. Out of scope (v1)

- Blog / writing section (candidate for v2).
- Multi-language support.
- Authentication for visitors (only the owner authenticates, into the admin).
- Comment systems or social feeds.
- E-commerce or payments.

---

## 10. Delivery plan / milestones

| Phase | Scope | Outcome |
|---|---|---|
| **0 — Foundation** | Next.js + Payload scaffold, MongoDB Atlas, S3/Blob storage, Vercel deploy pipeline, env config | Empty but deployable app with working admin |
| **1 — Content model** | Implement all Globals & Collections (§6), seed real content, wire SEO + Form Builder plugins | Editable content, ready to render |
| **2 — Core sections** | Hero, Projects Matrix + filtering, project case-study route | The "core engine" is live and shareable |
| **3 — Interactive layers** | Skills ecosystem, awards timeline, scroll/hover interactions | Full interactive experience |
| **4 — About & contact** | About layout, contact form + email + spam protection | Complete conversion path |
| **5 — Polish & launch** | Performance/accessibility/SEO pass to hit §2.2 targets, analytics, custom domain | Production launch |

---

## 11. Risks & mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 3D/point-cloud background hurts performance or mobile battery | Misses LCP/CWV targets | Lightweight implementation, off-screen pause, reduced-motion + low-power fallback to static/grid |
| Vercel ephemeral filesystem breaks media uploads | Broken images in production | External storage adapter (S3/Blob) configured from Phase 0 |
| Hover-only interactions inaccessible on touch | Lost usability for mobile reviewers | Mandatory touch/keyboard equivalents (FR-6.2, NFR-11) |
| Over-animation delays content for fast-scanning reviewers | Weakens the 5-second hook | Server-render text first; animations are progressive enhancement |
| Thin case-study content | Undercuts the academic value proposition | Enforce the fixed Problem/Architecture/Code/Result structure (FR-2.6) per project |

---

## 12. Acceptance criteria (launch readiness)

- [ ] All §2.2 metric targets met on production.
- [ ] Every collection/global from §6 is implemented and populated with real content.
- [ ] Projects filter smoothly by all three categories; each project has a complete case study following FR-2.6.
- [ ] Skill hover correctly highlights related projects (data-driven).
- [ ] Awards timeline renders chronologically with the WICE, Future of Capitalism, and Mongol-Tori entries.
- [ ] Contact form validates, stores submissions, and emails `[Email]`; spam protection active.
- [ ] CV downloads from the hero CTA; GitHub/LinkedIn links resolve.
- [ ] Fully responsive and keyboard-accessible; `prefers-reduced-motion` honored.
- [ ] SEO: per-page meta, OG images, sitemap, robots, and `Person` JSON-LD present.
- [ ] Admin panel auth-gated; secrets in env vars; media served from durable storage.
