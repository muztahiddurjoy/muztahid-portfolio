/* ============================================================
   MUZTAHID RAHMAN — founder portfolio data (hardcoded prototype)
   Founder-first framing: vision + impact, technical depth as proof.
   ============================================================ */

export const siteConfig = {
  name: 'Muztahid Rahman',
  shortName: 'Muztahid',
  role: 'Founder & Engineer',
  tagline: 'Building the future, one venture at a time.',
  location: 'Dhaka, Bangladesh',
  email: 'muztahid.appbaksho@gmail.com',
  github: 'https://github.com/muztahiddurjoy',
  linkedin: 'https://www.linkedin.com/in/muztahiddurjoy',
  availability: 'Building · open to bold collaborations',
  metaDescription:
    'Muztahid Rahman is a founder and engineer building companies and the technology behind them — from autonomous robotics to scalable products.',
  nav: [
    { label: 'Story', href: '/about' },
    { label: 'Ventures', href: '/ventures' },
    { label: 'Writing', href: '/writing' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Contact', href: '/contact' },
  ],
}

/* ---------------- Home ---------------- */
export const home = {
  eyebrow: 'Founder · Engineer · Builder',
  headline: ['Building the', 'future, one', 'venture at a time.'],
  // word(s) to italicize per line index → softens the serif headline
  headlineAccent: 'venture',
  script: 'from idea to shipped',
  lede:
    'I’m Muztahid — a founder who builds companies and the technology underneath them. I started a software studio, lead engineering teams, and ship autonomous systems. I’m most alive in the gap between a bold idea and the machine that makes it real.',
  primaryCta: { label: 'Explore my ventures', href: '/ventures' },
  secondaryCta: { label: 'Read my story', href: '/about' },
  marquee: [
    'Appbaksho',
    'BOT Engineers',
    'Mongol-Tori',
    'WICE Gold',
    'Future of Capitalism',
    'NASA Space Apps',
    'BRAC University',
  ],
  now: [
    { label: 'Founding', value: 'Appbaksho — a software studio shipping products for ambitious teams' },
    { label: 'Leading', value: 'Engineering at BOT Engineers as Chief Software Engineer' },
    { label: 'Building', value: 'Autonomous navigation with BRACU Mongol-Tori' },
    { label: 'Studying', value: 'Computer Science at BRAC University' },
  ],
}

export const stats = [
  { value: 5, suffix: '+', label: 'Ventures founded & led' },
  { value: 15, suffix: '+', label: 'Products shipped' },
  { value: 12, suffix: '', label: 'Awards & recognitions' },
  { value: 3, suffix: '', label: 'Organizations built' },
]

/* ---------------- Founder story (About) ---------------- */
export const story = {
  eyebrow: 'The story',
  title: 'I build companies — and the technology that makes them inevitable.',
  intro:
    'My work lives where vision meets the soldering iron. I don’t just imagine products; I architect the systems, lead the teams, and ship the things that turn an idea into a company.',
  portrait: { label: 'Muztahid Rahman', caption: 'Founder · Dhaka' },
  narrative: [
    'I grew up taking things apart to understand how they worked — then putting them back together better. That instinct never left. Today it shows up as the same loop at a bigger scale: see a gap, build the system that closes it, and rally people around the result.',
    'I founded Appbaksho to give ambitious teams a studio that ships like a startup and engineers like a veteran. As Chief Software Engineer at BOT Engineers, I lead a cross-functional team building production platforms, set the engineering culture, and turn roadmaps into shipped software. With BRACU Mongol-Tori, I push autonomy onto terrain that punishes shortcuts.',
    'What ties it together is a founder’s appetite for ownership: I want to be responsible for the whole arc — the pitch, the architecture, the team, and the metric that says it worked. Competitions like the World Invention Competition and the Future of Capitalism startup challenge sharpened the instinct to frame engineering as value, not just code.',
  ],
  philosophy: {
    quote:
      'Build like the W123 — over-engineered, mechanically pure, and made to outlast its creator.',
    body: 'Every venture, every line of code, every 3D-printed bracket should carry that intent: built to last, built to be trusted, built so the next person can stand on it.',
  },
  values: [
    {
      title: 'Vision first',
      body: 'Start from the world you want to exist, then reverse-engineer the system that creates it.',
    },
    {
      title: 'Ship to learn',
      body: 'A shipped prototype teaches more than a perfect plan. Momentum compounds.',
    },
    {
      title: 'Bridge the layers',
      body: 'The edge is where hardware meets software, where founders meet engineers. Live there.',
    },
    {
      title: 'Build to outlast',
      body: 'Over-engineer the things that matter. Systems should outlive the people who made them.',
    },
  ],
  journey: [
    { year: '2021', title: 'Started building', detail: 'First products, first clients — learning to ship under real constraints.' },
    { year: '2023', title: 'Founded Appbaksho', detail: 'Turned freelance momentum into a software studio with a delivery engine.' },
    { year: '2023', title: 'Joined Mongol-Tori', detail: 'Began leading autonomy & software for a Mars-rover platform.' },
    { year: '2023', title: 'NASA Space Apps', detail: 'Shipped a telemetry visualiser in a 48-hour global hackathon.' },
    { year: '2024', title: 'Chief Software Engineer', detail: 'Took the engineering lead at BOT Engineers; built the culture and the pipeline.' },
    { year: '2024', title: 'WICE Gold & startup stage', detail: 'Won an international invention Gold Medal; pitched at Future of Capitalism.' },
  ],
  next: 'Next, I’m scaling Appbaksho beyond services into products, and pushing autonomy research toward harder, less forgiving environments. If you’re building something audacious, let’s talk.',
}

/* ---------------- Ventures (projects, founder-framed) ---------------- */
export type VentureType = 'company' | 'product' | 'robotics' | 'research'

export const ventureTypeMeta: Record<VentureType, { label: string }> = {
  company: { label: 'Company' },
  product: { label: 'Product' },
  robotics: { label: 'Robotics' },
  research: { label: 'Research' },
}

export type Venture = {
  slug: string
  name: string
  tagline: string
  role: string
  type: VentureType
  year: string
  status: string
  featured: boolean
  summary: string
  cover: { label: string; caption: string }
  metrics: { label: string; value: string }[]
  stack: string[]
  // case study
  vision: string
  problem: string
  build: string[]
  outcome: string
  links: { label: string; url: string }[]
  gallery: { label: string; caption: string }[]
}

export const ventures: Venture[] = [
  {
    slug: 'appbaksho',
    name: 'Appbaksho',
    tagline: 'A software studio that ships like a startup.',
    role: 'Founder & Lead Developer',
    type: 'company',
    year: '2023',
    status: 'Active',
    featured: true,
    summary:
      'The company I founded to give ambitious teams a studio that combines startup speed with production-grade engineering — from discovery to deployment to the legal paperwork in between.',
    cover: { label: 'Appbaksho', caption: 'Software studio' },
    metrics: [
      { label: 'Clients shipped', value: '5+' },
      { label: 'Doc turnaround', value: '−95%' },
      { label: 'Founded', value: '2023' },
      { label: 'Stack', value: 'Full-stack' },
    ],
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'AWS', 'TypeScript'],
    vision:
      'Most agencies either move fast and break things or move slow and over-charge. I wanted a third option: a studio that ships at startup velocity without sacrificing the engineering rigor a real product needs.',
    problem:
      'New ventures need a full digital presence and the un-glamorous machinery of a business — legal documents, compliance, internal tooling — all at once, under tight timelines and tighter budgets.',
    build: [
      'Stood up a modular Next.js delivery stack so each client project starts at 60% done, not zero.',
      'Built an automated legal-document generation pipeline that templates compliance paperwork from structured inputs.',
      'Integrated a headless CMS so non-technical founders own their content without waiting on engineers.',
      'Wrapped everything in AWS-backed deploys with monitoring, from client discovery to post-launch.',
    ],
    outcome:
      'Delivered 5+ production web products for SMB clients and cut legal paperwork turnaround from weeks to hours — proving a studio can be both fast and serious.',
    links: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    gallery: [
      { label: 'Studio', caption: 'Appbaksho platform' },
      { label: 'Ops', caption: 'Internal delivery tooling' },
      { label: 'Docs', caption: 'Automated compliance docs' },
    ],
  },
  {
    slug: 'bot-engineers',
    name: 'BOT Engineers',
    tagline: 'Leading the engine that ships the product.',
    role: 'Chief Software Engineer',
    type: 'company',
    year: '2024',
    status: 'Active',
    featured: true,
    summary:
      'As Chief Software Engineer I lead a cross-functional team building production platforms — setting the engineering culture, the CI/CD backbone, and the standards that let a team ship fast without breaking trust.',
    cover: { label: 'BOT Engineers', caption: 'Engineering leadership' },
    metrics: [
      { label: 'Deploy feedback', value: '3× faster' },
      { label: 'Architecture', value: 'Monorepo' },
      { label: 'Role', value: 'Chief SWE' },
      { label: 'Since', value: '2024' },
    ],
    stack: ['Next.js', 'NestJS', 'Docker', 'AWS', 'Turborepo', 'TypeScript'],
    vision:
      'A team is only as fast as its slowest feedback loop. I wanted to make shipping boring, predictable, and safe — so the team could spend its creativity on the product, not the pipeline.',
    problem:
      'A growing team lacked visibility into sprints and deploys; build status lived in scattered tooling and code-review culture needed structure to scale.',
    build: [
      'Migrated the codebase to a Turborepo monorepo, unifying apps and shared packages behind one build graph.',
      'Designed internal dashboards surfacing sprint state, workload, and deploy history in one place.',
      'Streamed GitHub webhook events into a real-time build-status feed.',
      'Established CI/CD gates and a code-review culture that scales with the team.',
    ],
    outcome:
      'Tripled the speed of deploy feedback and standardised a review culture — engineering throughput became visible, predictable, and trusted.',
    links: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    gallery: [
      { label: 'Board', caption: 'Sprint dashboards' },
      { label: 'Pipeline', caption: 'CI/CD with gates' },
      { label: 'Monorepo', caption: 'Unified build graph' },
    ],
  },
  {
    slug: 'enterprise-commerce',
    name: 'zf-emart & zf-foods',
    tagline: 'Multi-tenant commerce that runs itself.',
    role: 'Full-Stack Architect',
    type: 'product',
    year: '2024',
    status: 'Shipped',
    featured: true,
    summary:
      'A production, multi-tenant commerce platform powering multiple storefronts on one typed backend — inventory, payments, and order tracking in real time, with 99.9% uptime.',
    cover: { label: 'zf-emart', caption: 'Enterprise commerce' },
    metrics: [
      { label: 'DB models', value: '25+' },
      { label: 'Endpoints', value: '60+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Response', value: '<200ms' },
    ],
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'AWS', 'Docker'],
    vision:
      'Small businesses deserve infrastructure that big retailers take for granted. One backend, many storefronts, zero compromise on reliability.',
    problem:
      'Multiple storefronts needed to run on one backend without leaking data across tenants, while handling thousands of SKUs, nested category trees, and zero-downtime deploys.',
    build: [
      'Engineered a NestJS API with clean service–repository separation and Prisma for type-safe access across 25+ models.',
      'Resolved tenancy per request so storefronts share logic but never share data.',
      'Secured JWT auth with refresh-token rotation and AWS SES on verified custom domains.',
      'Shipped Docker images through CI/CD with health checks and rollbacks for zero-downtime releases.',
    ],
    outcome:
      'The platform sustains 99.9% uptime with sub-200 ms responses across 60+ endpoints, synchronising inventory in real time — and editors update catalogs without engineering.',
    links: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    gallery: [
      { label: 'Schema', caption: 'Normalised data model' },
      { label: 'Admin', caption: 'Role-based dashboard' },
      { label: 'Scale', caption: 'Real-time inventory' },
    ],
  },
  {
    slug: 'mongol-tori-autonomy',
    name: 'Mongol-Tori Autonomy',
    tagline: 'Teaching a rover to think for itself.',
    role: 'AI & Autonomy Lead',
    type: 'robotics',
    year: '2024',
    status: 'Ongoing',
    featured: true,
    summary:
      'A full ROS2 autonomy stack for a Mars-rover platform with BRACU Mongol-Tori: SLAM mapping, LiDAR–IMU sensor fusion, and real-time path planning across unstructured terrain.',
    cover: { label: 'Mongol-Tori', caption: 'Autonomous rover' },
    metrics: [
      { label: 'Nav accuracy', value: '±15cm' },
      { label: 'Control loop', value: '30Hz' },
      { label: 'Sensors', value: '5+' },
      { label: 'Arena', value: 'URC' },
    ],
    stack: ['ROS2', 'C/C++', 'Python', 'SLAM', 'LiDAR', 'STM32'],
    vision:
      'Autonomy shouldn’t need a manicured lab. I wanted a rover that holds its line on rocky, GPS-denied terrain — the kind of robustness real-world robotics actually demands.',
    problem:
      'The rover must traverse rocky, GPS-denied terrain and make real-time decisions on constrained onboard compute, within a hard 33 ms control budget.',
    build: [
      'Split perception, planning, and control into independent ROS2 nodes over DDS, so a stalled planner never blocks the motor watchdog.',
      'Fused LiDAR point clouds with IMU data through an EKF for drift-resistant odometry.',
      'Wrote a C++ A* planner over a rolling costmap with obstacle inflation, arbitrated by a mission state machine.',
      'Clamped low-level motor commands on an STM32 bridge, decoupling intent from the drivetrain.',
    ],
    outcome:
      'Holds ±15 cm waypoint accuracy at a sustained 30 Hz loop across five fused sensors — turning intermittent autonomy runs into repeatable ones.',
    links: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    gallery: [
      { label: 'Costmap', caption: 'Rolling costmap' },
      { label: 'Field', caption: 'Terrain testing' },
      { label: 'Rig', caption: 'Perception head' },
    ],
  },
  {
    slug: 'space-apps-telemetry',
    name: 'Orbital Telemetry Visualiser',
    tagline: '48 hours from raw signal to story.',
    role: 'Data & Frontend',
    type: 'product',
    year: '2023',
    status: 'Prototype',
    featured: false,
    summary:
      'A NASA Space Apps build that turns dense satellite telemetry into a legible environmental-monitoring story — real-time streaming visualisations, shipped in a single weekend.',
    cover: { label: 'Telemetry', caption: 'NASA Space Apps' },
    metrics: [
      { label: 'Sprint', value: '48h' },
      { label: 'Streams', value: 'Real-time' },
      { label: 'Scope', value: 'Global' },
      { label: 'Team', value: 'Cross-fn' },
    ],
    stack: ['Python', 'Next.js', 'TypeScript', 'REST'],
    vision:
      'Data only matters when people can feel it. I wanted to make satellite telemetry legible to a non-expert in seconds, not hours.',
    problem:
      'Raw satellite telemetry is dense and hard to interpret; an environmental story needed to land within a 48-hour window.',
    build: [
      'Built a Python pipeline to ingest and normalise telemetry into a stream-friendly shape.',
      'Rendered real-time streaming graphs over the processed data in Next.js.',
      'Decoupled ingestion from visualisation with REST so the team could work in parallel.',
      'Designed a global-to-signal drilldown for fast exploration.',
    ],
    outcome:
      'Shipped a working data-visualisation prototype inside the sprint — translating telemetry into an interactive monitoring narrative under real constraints.',
    links: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    gallery: [
      { label: 'Streams', caption: 'Live graphs' },
      { label: 'Map', caption: 'Global view' },
      { label: 'Sprint', caption: '48 hours' },
    ],
  },
  {
    slug: 'fabrication-studio',
    name: 'Fabrication Studio',
    tagline: 'Where digital designs become physical things.',
    role: 'Design & Fabrication',
    type: 'research',
    year: '2024',
    status: 'Ongoing',
    featured: false,
    summary:
      'An end-to-end physical prototyping practice — CAD through slice optimisation to production on Bambu Lab hardware — that turns ideas into custom parts for robotic and product builds.',
    cover: { label: 'Fabrication', caption: 'CAD → print' },
    metrics: [
      { label: 'Parts produced', value: '30+' },
      { label: 'Precision', value: '0.12mm' },
      { label: 'Infill', value: 'Gyroid' },
      { label: 'Hardware', value: 'Bambu Lab' },
    ],
    stack: ['Fusion 360', 'CAD', 'FDM/FFF', 'Bambu Lab'],
    vision:
      'A founder who can prototype hardware as fast as software moves twice as quick. I built a practice to close the loop between an idea and a part you can hold.',
    problem:
      'Robotic assemblies need custom enclosures, mounts, and brackets that no off-the-shelf part fits — each iteration must go from idea to validated physical part fast and repeatably.',
    build: [
      'Start every component as a parametric CAD model with explicit tolerances and assembly constraints.',
      'Tune slice profiles per role — 0.12 mm precision, gyroid for strength, grid for speed.',
      'Print on Bambu Lab hardware with real-time monitoring and heat-set insert post-processing.',
      'Capture proven mounts in a parts library so the next build reuses instead of redesigns.',
    ],
    outcome:
      'Produced 30+ custom parts that integrate directly into rover and product builds — closing the loop between digital design and physical hardware.',
    links: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    gallery: [
      { label: 'CAD', caption: 'Parametric model' },
      { label: 'Slice', caption: 'Gyroid infill' },
      { label: 'Print', caption: 'Finished part' },
    ],
  },
]

/* ---------------- Writing (blog) ---------------- */
export type WritingCategory = 'building' | 'engineering' | 'robotics' | 'essays'

export const writingCategoryMeta: Record<WritingCategory, { label: string }> = {
  building: { label: 'Building & Founding' },
  engineering: { label: 'Engineering' },
  robotics: { label: 'Robotics' },
  essays: { label: 'Essays' },
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'quote'; text: string }

export type Article = {
  slug: string
  title: string
  excerpt: string
  date: string
  dateLabel: string
  readTime: string
  category: WritingCategory
  tags: string[]
  featured: boolean
  cover: { label: string; caption: string }
  body: Block[]
}

const loremBuild = (intro: string): Block[] => [
  { type: 'p', text: intro },
  { type: 'h', text: 'Why it matters' },
  {
    type: 'p',
    text: 'The interesting problems live in the seams — between disciplines, between the plan and the prototype, between what a team intends and what actually ships. This is where I spend most of my time, and where the leverage hides.',
  },
  {
    type: 'quote',
    text: 'Over-engineer the things that matter; ship the rest. The art is knowing which is which.',
  },
  { type: 'h', text: 'How I think about it' },
  {
    type: 'p',
    text: 'Start from the outcome you want to be true, reverse-engineer the smallest system that makes it true, and ship that. Then let reality correct your assumptions faster than any planning document could.',
  },
  {
    type: 'p',
    text: 'The compounding comes from repetition: every shipped iteration teaches the team something a slide deck never would, and the momentum becomes its own moat.',
  },
]

export const articles: Article[] = [
  {
    slug: 'building-a-studio-not-an-agency',
    title: 'Building a Studio, Not an Agency',
    excerpt:
      'Why I founded Appbaksho to ship like a startup and engineer like a veteran — and what that distinction actually changes day to day.',
    date: '2026-03-15',
    dateLabel: 'Mar 2026',
    readTime: '8 min',
    category: 'building',
    tags: ['Founding', 'Appbaksho', 'Studio', 'Strategy'],
    featured: true,
    cover: { label: 'Studio', caption: 'On founding Appbaksho' },
    body: loremBuild(
      'An agency sells hours. A studio sells outcomes. That single reframing changed how I hire, how I price, and how I build the delivery engine behind Appbaksho — and it’s the difference between renting your time and compounding your leverage.',
    ),
  },
  {
    slug: 'shipping-under-constraint',
    title: 'Shipping Under Constraint',
    excerpt:
      'The 48-hour hackathon taught me more about product than any six-month roadmap. A field guide to building when the clock is the enemy.',
    date: '2026-02-28',
    dateLabel: 'Feb 2026',
    readTime: '6 min',
    category: 'building',
    tags: ['Product', 'Hackathon', 'NASA', 'Velocity'],
    featured: false,
    cover: { label: 'Constraint', caption: 'Building against the clock' },
    body: loremBuild(
      'Constraint is a feature. When you only have 48 hours, you stop debating and start shipping — and the things you choose to cut tell you exactly what the product actually is.',
    ),
  },
  {
    slug: 'the-engineering-culture-i-want',
    title: 'The Engineering Culture I Want to Build',
    excerpt:
      'Notes on making shipping boring — CI/CD, code review, and the quiet systems that let a team move fast without breaking trust.',
    date: '2026-02-10',
    dateLabel: 'Feb 2026',
    readTime: '9 min',
    category: 'engineering',
    tags: ['Leadership', 'CI/CD', 'Culture', 'BOT Engineers'],
    featured: false,
    cover: { label: 'Culture', caption: 'On engineering leadership' },
    body: loremBuild(
      'The best engineering cultures make the right thing the easy thing. At BOT Engineers I spent more time on the pipeline than the product — because a team is only ever as fast as its slowest feedback loop.',
    ),
  },
  {
    slug: 'autonomy-on-unforgiving-terrain',
    title: 'Autonomy on Unforgiving Terrain',
    excerpt:
      'Tuning SLAM, fusing LiDAR with IMU, and surviving GPS-denied terrain on the Mongol-Tori rover — where robustness beats cleverness.',
    date: '2025-12-18',
    dateLabel: 'Dec 2025',
    readTime: '12 min',
    category: 'robotics',
    tags: ['ROS2', 'SLAM', 'Autonomy', 'Mongol-Tori'],
    featured: true,
    cover: { label: 'Autonomy', caption: 'Robotics in the wild' },
    body: loremBuild(
      'A lab is a lie a robot tells itself. The moment you put a rover on real terrain — loose regolith, no GPS, a 33 ms control budget — every assumption gets audited by physics.',
    ),
  },
  {
    slug: 'the-w123-school-of-engineering',
    title: 'The W123 School of Engineering',
    excerpt:
      'What a 1980s Mercedes taught me about building software, companies, and systems designed to outlast their creator.',
    date: '2026-01-22',
    dateLabel: 'Jan 2026',
    readTime: '10 min',
    category: 'essays',
    tags: ['Philosophy', 'Reliability', 'Design'],
    featured: false,
    cover: { label: 'W123', caption: 'On building to last' },
    body: loremBuild(
      'The Mercedes W123 was over-engineered on purpose — built so the next owner, decades later, could still trust it. I want every venture I build to carry that same quiet promise.',
    ),
  },
  {
    slug: 'framing-engineering-as-value',
    title: 'Framing Engineering as Value, Not Code',
    excerpt:
      'Lessons from the Future of Capitalism startup stage: how founders translate deep technical work into a story investors and users feel.',
    date: '2026-01-05',
    dateLabel: 'Jan 2026',
    readTime: '7 min',
    category: 'building',
    tags: ['Startups', 'Pitching', 'Value', 'Competition'],
    featured: false,
    cover: { label: 'Value', caption: 'From code to company' },
    body: loremBuild(
      'Nobody buys your architecture diagram. Standing on the Future of Capitalism stage, I learned that the founder’s job is to translate engineering depth into a value a room of strangers can feel in thirty seconds.',
    ),
  },
  {
    slug: 'the-cloud-pipeline-that-sleeps-well',
    title: 'The Cloud Pipeline That Sleeps Well',
    excerpt:
      'Zero-downtime deploys, health checks, and rollbacks — building infrastructure you can deploy on a Friday and still sleep.',
    date: '2025-12-01',
    dateLabel: 'Dec 2025',
    readTime: '11 min',
    category: 'engineering',
    tags: ['AWS', 'CI/CD', 'DevOps', 'Reliability'],
    featured: false,
    cover: { label: 'Pipeline', caption: 'On cloud infrastructure' },
    body: loremBuild(
      'You can measure an engineering org by one question: would they deploy on a Friday afternoon? Building a pipeline you trust that much is mostly about making failure boring and recovery automatic.',
    ),
  },
]

/* ---------------- Achievements ---------------- */
export type AchievementType = 'award' | 'competition' | 'leadership' | 'milestone'

export const achievementTypeMeta: Record<AchievementType, { label: string }> = {
  award: { label: 'Award' },
  competition: { label: 'Competition' },
  leadership: { label: 'Leadership' },
  milestone: { label: 'Milestone' },
}

export type Achievement = {
  id: string
  title: string
  organization: string
  date: string
  dateLabel: string
  type: AchievementType
  description: string
  featured: boolean
  link?: string
}

export const achievements: Achievement[] = [
  {
    id: 'wice-gold',
    title: 'WICE Gold Medal',
    organization: 'World Invention Competition & Exhibition',
    date: '2024-08-01',
    dateLabel: 'August 2024',
    type: 'award',
    description:
      'Awarded the Gold Medal at an international invention competition for an engineered systems entry — recognised for technical depth and real-world impact among a global field.',
    featured: true,
  },
  {
    id: 'future-capitalism',
    title: 'Future of Capitalism — Startup Competition',
    organization: 'Startup Competition',
    date: '2024-04-01',
    dateLabel: 'April 2024',
    type: 'competition',
    description:
      'Pitched a venture concept on the startup stage — sharpening the founder’s craft of turning engineering into a story of value, market, and momentum.',
    featured: true,
  },
  {
    id: 'appbaksho-founder',
    title: 'Founded Appbaksho',
    organization: 'Appbaksho',
    date: '2023-03-01',
    dateLabel: '2023',
    type: 'milestone',
    description:
      'Turned freelance momentum into a software studio — building the delivery engine, the brand, and the first client roster from zero.',
    featured: true,
  },
  {
    id: 'bot-chief',
    title: 'Chief Software Engineer',
    organization: 'BOT Engineers',
    date: '2024-01-01',
    dateLabel: '2024 — Present',
    type: 'leadership',
    description:
      'Lead a cross-functional engineering team building production platforms — architected CI/CD, drove a monorepo migration, and set the code-review culture.',
    featured: false,
  },
  {
    id: 'mongol-tori',
    title: 'AI & Autonomy Lead',
    organization: 'BRACU Mongol-Tori',
    date: '2023-09-01',
    dateLabel: '2023 — Present',
    type: 'leadership',
    description:
      'Lead autonomy and software for a Mars-rover platform — ROS2, SLAM, and STM32 firmware bridging perception, planning, and physical control.',
    featured: false,
  },
  {
    id: 'nasa-space-apps',
    title: 'NASA Space Apps Challenger',
    organization: 'NASA International Space Apps Challenge',
    date: '2023-10-01',
    dateLabel: 'October 2023',
    type: 'competition',
    description:
      'Built a satellite-telemetry visualiser in a 48-hour global hackathon, collaborating across disciplines under sprint constraints.',
    featured: false,
  },
]

/* ---------------- Certificates ---------------- */
export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  dateLabel: string
  credentialId: string
  skills: string[]
}

export const certificates: Certificate[] = [
  {
    id: 'aws-ccp',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024-06-01',
    dateLabel: 'Jun 2024',
    credentialId: 'AWS-CCP-2024-MR',
    skills: ['Cloud', 'AWS', 'Infrastructure'],
  },
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer',
    issuer: 'Meta · Coursera',
    date: '2024-02-01',
    dateLabel: 'Feb 2024',
    credentialId: 'META-FE-9X42',
    skills: ['React', 'JavaScript', 'UI'],
  },
  {
    id: 'nvidia-dl',
    title: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA Deep Learning Institute',
    date: '2024-01-01',
    dateLabel: 'Jan 2024',
    credentialId: 'DLI-FDL-7731',
    skills: ['Deep Learning', 'Python', 'CUDA'],
  },
  {
    id: 'ros2-dev',
    title: 'ROS2 for Robotics Developers',
    issuer: 'The Construct',
    date: '2023-11-01',
    dateLabel: 'Nov 2023',
    credentialId: 'ROS2-DEV-2231',
    skills: ['ROS2', 'C++', 'Robotics'],
  },
  {
    id: 'mongodb-node',
    title: 'MongoDB for Node.js Developers',
    issuer: 'MongoDB University',
    date: '2023-09-01',
    dateLabel: 'Sep 2023',
    credentialId: 'M220JS-44A1',
    skills: ['MongoDB', 'Node.js', 'Databases'],
  },
  {
    id: 'gcp-leader',
    title: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    date: '2023-07-01',
    dateLabel: 'Jul 2023',
    credentialId: 'GCP-CDL-5567',
    skills: ['Cloud', 'GCP', 'Strategy'],
  },
  {
    id: 'postman-api',
    title: 'API Fundamentals Student Expert',
    issuer: 'Postman',
    date: '2023-05-01',
    dateLabel: 'May 2023',
    credentialId: 'PM-API-8890',
    skills: ['APIs', 'REST', 'Testing'],
  },
  {
    id: 'fcc-responsive',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2022-12-01',
    dateLabel: 'Dec 2022',
    credentialId: 'FCC-RWD-1042',
    skills: ['HTML', 'CSS', 'Accessibility'],
  },
  {
    id: 'udemy-fullstack',
    title: 'The Complete Full-Stack Web Bootcamp',
    issuer: 'Udemy',
    date: '2022-08-01',
    dateLabel: 'Aug 2022',
    credentialId: 'UC-FS-3398',
    skills: ['Full-Stack', 'Node.js', 'React'],
  },
]

/* ---------------- Contact ---------------- */
export const contact = {
  eyebrow: 'Let’s build',
  title: 'Have something audacious in mind?',
  blurb:
    'Whether it’s a venture worth founding, a product worth shipping, or a system worth bridging hardware and software — I read every message. Let’s make something that lasts.',
  channels: [
    { label: 'Email', value: 'muztahid.appbaksho@gmail.com', href: 'mailto:muztahid.appbaksho@gmail.com' },
    { label: 'GitHub', value: 'github.com/muztahiddurjoy', href: 'https://github.com/muztahiddurjoy' },
    { label: 'LinkedIn', value: 'in/muztahiddurjoy', href: 'https://www.linkedin.com/in/muztahiddurjoy' },
    { label: 'Location', value: 'Dhaka, Bangladesh' },
  ],
}

/* ---------------- Derived content types (props for CMS-driven pages) ---------------- */
export type SiteConfig = typeof siteConfig
export type HomeData = typeof home
export type Stat = (typeof stats)[number]
export type Story = typeof story
export type ContactData = typeof contact
