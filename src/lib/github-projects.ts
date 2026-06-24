import type { Project } from './portfolio-data'

/**
 * Portfolio projects imported from GitHub — owned repos + organization work
 * (Appbaksho, Intredia, BinduLogic, BRACU Mongol-Tori, BOT Engineers).
 *
 * Built from the GitHub API: repo metadata, languages, topics and README
 * excerpts. Each `cover.url` is the canonical GitHub Open Graph card
 * (`opengraph.githubassets.com/<hash>/<owner>/<repo>`). Copy is grounded in
 * each repo's real description / README; org & client attribution lives in
 * `organization` (empty when it would just repeat the project name).
 *
 * Order matters: featured projects come first in curated strength order (the
 * homepage shows the top 4), then the rest most-recent first. Edit here, then
 * `npm run seed` / `npm run seed:projects` to push into the CMS, or edit /admin.
 */
export const githubProjects: Project[] = [
  {
    slug: 'zf-pharma',
    name: 'ZF Pharma',
    tagline: 'Storefront crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-06-08',
    status: 'Live',
    featured: true,
    summary:
      'ZF Pharma A full stack online pharmacy management platform for Zf Pharma, Mirpur DOHS, Dhaka . The system consists of three applications: a customer facing storefront, an admin dashboard, and a NestJS REST API backend. Live at zf-pharma.vercel.app.',
    cover: {
      label: 'ZF Pharma',
      caption: 'Storefront crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/412f1273bbaaa43a/Appbaksho/zf-pharma',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: "Build Appbaksho a modern storefront that's quick to load and easy to maintain.",
    problem: 'Appbaksho wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, Python, JavaScript.',
      'Shipped to production at zf-pharma.vercel.app.',
      'Delivered as part of Appbaksho.',
    ],
    outcome: 'Live in production at zf-pharma.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://zf-pharma.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/zf-pharma',
      },
    ],
    gallery: [],
  },
  {
    slug: 'mt11-controls',
    name: 'MT11 Controls',
    tagline: 'MT11 control system',
    role: 'Robotics Software Engineer',
    type: 'research',
    organization: 'BRACU Mongol-Tori',
    year: '2025',
    date: '2026-06-16',
    status: 'Field-tested',
    featured: true,
    summary:
      'MT11 Rover Controls Workspace A complete robotics control system integrating ROS2, PlatformIO firmware, and MAVLink protocol for autonomous rover operations. This workspace contains the control software for the MT11 Rover project.',
    cover: {
      label: 'MT11 Controls',
      caption: 'MT11 control system',
      url: 'https://opengraph.githubassets.com/177da4084614a3d5/bracu-mongoltori/mt11-controls',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'Python',
      },
      {
        label: 'Status',
        value: 'Field-tested',
      },
    ],
    stack: ['Python', 'C++', 'CMake'],
    vision: 'Make mt11 controls robust enough for unforgiving field conditions.',
    problem: 'MT11 Controls needed to survive rough terrain, tight timing and limited compute.',
    build: [
      'Built with Python, C++, CMake.',
      "Delivered as part of BRACU Mongol-Tori's engineering team.",
    ],
    outcome: "Fielded as part of BRACU Mongol-Tori's rover programme.",
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/bracu-mongoltori/mt11-controls',
      },
    ],
    gallery: [],
  },
  {
    slug: 'touchpad-solutions',
    name: 'Touchpad Solutions',
    tagline: "Appbaksho's web app, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-06-10',
    status: 'Live',
    featured: true,
    summary:
      'Touchpad Solutions is a web app built with TypeScript, JavaScript for Appbaksho, deployed at touchpad-solutions.vercel.app.',
    cover: {
      label: 'Touchpad Solutions',
      caption: "Appbaksho's web app, engineered end to end.",
      url: 'https://opengraph.githubassets.com/b4c9d56430a6c657/Appbaksho/touchpad-solutions',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Appbaksho a production-grade web app that scales with the business.',
    problem: 'Appbaksho required a web app that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at touchpad-solutions.vercel.app.',
      'Delivered as part of Appbaksho.',
    ],
    outcome: 'Live in production at touchpad-solutions.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://touchpad-solutions.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/touchpad-solutions',
      },
    ],
    gallery: [],
  },
  {
    slug: 'mongol-tori-alumni-connect',
    name: 'Mongol Tori Alumni Connect',
    tagline: 'A modern tool, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BOT Engineers',
    year: '2025',
    date: '2026-01-07',
    status: 'Live',
    featured: true,
    summary:
      'Mongol Tori Alumni Connect is a tool built with TypeScript, JavaScript, PostgreSQL for BOT Engineers, deployed at mongol-tori-alumni-connect.vercel.app.',
    cover: {
      label: 'Mongol Tori Alumni Connect',
      caption: 'A modern tool, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/7d4b67a73b593406c2a46c9861e05b35c7433e0495cf379cda72ec440e464abd/BOT-ENGINEERS/mongol-tori-alumni-connect',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript', 'PostgreSQL'],
    vision: 'Deliver BOT Engineers a production-grade tool that scales with the business.',
    problem: 'BOT Engineers required a tool that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript, PostgreSQL.',
      'Shipped to production at mongol-tori-alumni-connect.vercel.app.',
      'Delivered as part of BOT Engineers.',
    ],
    outcome: 'Live in production at mongol-tori-alumni-connect.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://mongol-tori-alumni-connect.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/BOT-ENGINEERS/mongol-tori-alumni-connect',
      },
    ],
    gallery: [],
  },
  {
    slug: 'ksf-disney-land',
    name: 'KSF Disney Land',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-06-22',
    status: 'Live',
    featured: true,
    summary:
      'KSF Disney Land is a web app built with TypeScript, JavaScript, Python for Appbaksho, deployed at ksf-disney-land.vercel.app.',
    cover: {
      label: 'KSF Disney Land',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/d613132416d0acb9/Appbaksho/ksf-disney-land',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript', 'Python'],
    vision: 'Give Appbaksho a fast, dependable web app that people genuinely enjoy using.',
    problem:
      'Appbaksho needed a web app that loads fast, looks sharp and is simple to run day to day.',
    build: [
      'Built with TypeScript, JavaScript, Python.',
      'Shipped to production at ksf-disney-land.vercel.app.',
      'Delivered as part of Appbaksho.',
    ],
    outcome: 'Live in production at ksf-disney-land.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://ksf-disney-land.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/ksf-disney-land',
      },
    ],
    gallery: [],
  },
  {
    slug: 'bindusms-woocommerce-plugin',
    name: 'Bindusms Woocommerce Plugin',
    tagline: 'BinduSMS WooCommerce Plugin for sending order notification SMS',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2022',
    date: '2022-11-03',
    status: 'Live',
    featured: true,
    summary:
      'BinduSms Plugin for WordPress Wordpress Woocommerce plugin for BinduSms. This plugin lets you notify your customers about their WooCommerce order updates via SMS. To use it you will need a BinduSMS account. Sign up for free at sms.bindulogic.com.',
    cover: {
      label: 'Bindusms Woocommerce Plugin',
      caption: 'BinduSMS WooCommerce Plugin for sending order notification SMS',
      url: 'https://opengraph.githubassets.com/312a92ff707a90ee0444654c10094a2dc65f1db845970b7dda5d6b325e66b460/BinduLogic/bindusms-woocommerce-plugin',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'PHP',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['PHP'],
    vision: 'Deliver BinduLogic a production-grade storefront that scales with the business.',
    problem: 'BinduLogic required a storefront that works on every device and is easy to extend.',
    build: [
      'Built with PHP.',
      'Shipped to production at sms.bindulogic.com.',
      'Delivered as part of BinduLogic.',
    ],
    outcome: 'Live in production at sms.bindulogic.com.',
    links: [
      {
        label: 'Live site',
        url: 'https://sms.bindulogic.com',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/bindusms-woocommerce-plugin',
      },
    ],
    gallery: [],
  },
  {
    slug: 'bn-ansi-to-unicode',
    name: 'Bangla ANSI To Unicode',
    tagline: 'Typescript Bangla text ANSI (Bijoy) to Unicode format converter',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2022',
    date: '2022-08-25',
    status: 'Shipped',
    featured: true,
    summary:
      'Bijoy ANSI to Unicode converter Typescript Bangla text ANSI (Bijoy) to Unicode format converter. The original author of this was @codesigntheory and package source code was unavailable on Github.',
    cover: {
      label: 'Bangla ANSI To Unicode',
      caption: 'Typescript Bangla text ANSI (Bijoy) to Unicode format converter',
      url: 'https://opengraph.githubassets.com/3e89a2069406e20e2e1b94c44e4f551b8a815853b435274d877e78d622471997/BinduLogic/bn-ansi-to-unicode',
    },
    metrics: [
      {
        label: 'GitHub stars',
        value: '1',
        proof: true,
      },
      {
        label: 'Primary stack',
        value: 'JavaScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['JavaScript'],
    vision: 'Give BinduLogic a fast, dependable tool that people genuinely enjoy using.',
    problem:
      'BinduLogic needed a tool that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with JavaScript.', 'Delivered as part of BinduLogic.'],
    outcome: 'Delivered for BinduLogic.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/bn-ansi-to-unicode',
      },
    ],
    gallery: [],
  },
  {
    slug: 'qikard',
    name: 'Qikard',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2024',
    date: '2025-11-02',
    status: 'Live',
    featured: true,
    summary:
      'Qikard is a web app built with TypeScript, JavaScript, deployed at qikard-main-website.vercel.app.',
    cover: {
      label: 'Qikard',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/389244d0194307bb/muztahiddurjoy/qikard',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Qikard a production-grade web app that scales with the business.',
    problem: 'Qikard required a web app that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at qikard-main-website.vercel.app.',
    ],
    outcome: 'Live in production at qikard-main-website.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://qikard-main-website.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/qikard',
      },
    ],
    gallery: [],
  },
  {
    slug: 'auracard',
    name: 'Auracard',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2026',
    date: '2026-06-22',
    status: 'Live',
    featured: true,
    summary:
      'Auracard Digital Identity Platform Auracard is a modern digital identity platform that enables professionals to create verified digital profiles accessible via NFC enabled cards and smart links. Live at auracard-tan.vercel.app.',
    cover: {
      label: 'Auracard',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/f5d3fbbdd2f3e2e4/muztahiddurjoy/Auracard',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Auracard a modern web app that's quick to load and easy to maintain.",
    problem: 'Auracard wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at auracard-tan.vercel.app.',
    ],
    outcome: 'Live in production at auracard-tan.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://auracard-tan.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/Auracard',
      },
    ],
    gallery: [],
  },
  {
    slug: 'kotha-boli',
    name: 'Kotha Boli',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2026-06-21',
    status: 'Live',
    featured: true,
    summary:
      'KothaBoli Language Learning Platform A modern platform connecting language learners with native speakers for personalized one on one sessions. Project Structure Quick Start Prerequisites Node.js 18+ and npm Docker and Docker Compose Database Setup 1. Live at kotha-boli.vercel.app.',
    cover: {
      label: 'Kotha Boli',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/fd8d30c37924bd5c/muztahiddurjoy/kotha-boli',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: "Build Kotha Boli a modern web app that's quick to load and easy to maintain.",
    problem: 'Kotha Boli wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, Python, JavaScript.',
      'Shipped to production at kotha-boli.vercel.app.',
    ],
    outcome: 'Live in production at kotha-boli.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://kotha-boli.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/kotha-boli',
      },
    ],
    gallery: [],
  },
  {
    slug: 'dbs-web-new',
    name: 'DBS Web New',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'DBS',
    year: '2025',
    date: '2026-06-21',
    status: 'Live',
    featured: false,
    summary:
      'DBS Web New is a web app built with TypeScript, Python, JavaScript for DBS, deployed at dbs-web-new.vercel.app.',
    cover: {
      label: 'DBS Web New',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/73cbfcaf0ea75c82/muztahiddurjoy/dbs_web_new',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: 'Deliver DBS a production-grade web app that scales with the business.',
    problem: 'DBS required a web app that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, Python, JavaScript.',
      'Shipped to production at dbs-web-new.vercel.app.',
    ],
    outcome: 'Live in production at dbs-web-new.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://dbs-web-new.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/dbs_web_new',
      },
    ],
    gallery: [],
  },
  {
    slug: 'ksf-internal-software',
    name: 'KSF Internal Software',
    tagline: 'A modern platform, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-06-21',
    status: 'Shipped',
    featured: false,
    summary:
      'KSF Internal Software is a platform built with TypeScript, Python, JavaScript for Appbaksho.',
    cover: {
      label: 'KSF Internal Software',
      caption: 'A modern platform, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/4d06977d5c56dde6/Appbaksho/ksf-internal-software',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: "Turn Appbaksho's requirements into a polished platform shipped on a current stack.",
    problem:
      'Appbaksho needed a reliable platform that could ship quickly without cutting corners.',
    build: ['Built with TypeScript, Python, JavaScript.', 'Delivered as part of Appbaksho.'],
    outcome: 'Delivered for Appbaksho.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/ksf-internal-software',
      },
    ],
    gallery: [],
  },
  {
    slug: 'jawad-academy',
    name: 'Jawad Academy',
    tagline: 'Website for jawad academy',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2026',
    date: '2026-06-20',
    status: 'Live',
    featured: false,
    summary:
      'জাওয়াদ একাডেমি (Jawad Academy) A Bangla first Islamic learning platform (LMS) built with Payload CMS 3 + Next.js 16 (App Router, React 19). Live at jawad-academy.vercel.app.',
    cover: {
      label: 'Jawad Academy',
      caption: 'Website for jawad academy',
      url: 'https://opengraph.githubassets.com/68a03dd436880191/muztahiddurjoy/jawad-academy',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision:
      'Deliver Jawad Academy a production-grade learning platform that scales with the business.',
    problem:
      'Jawad Academy required a learning platform that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at jawad-academy.vercel.app.',
    ],
    outcome: 'Live in production at jawad-academy.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://jawad-academy.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/jawad-academy',
      },
    ],
    gallery: [],
  },
  {
    slug: 'ihram-shop',
    name: 'Ihram Shop',
    tagline: 'TypeScript-built storefront for Ihram Shop.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2026',
    date: '2026-06-20',
    status: 'Live',
    featured: false,
    summary:
      'Ihram Shop (ইহরাম শপ) E commerce website built with Next.js 16 + PayloadCMS 3.85 + PostgreSQL , with Bangla UI and Bangladeshi Taka (৳) pricing, online (Stripe) and in person (POS) sales, a blog, product reviews, and Omrah/Hajj cash on delivery leads.',
    cover: {
      label: 'Ihram Shop',
      caption: 'TypeScript-built storefront for Ihram Shop.',
      url: 'https://opengraph.githubassets.com/eb58a646da7b1d6d/muztahiddurjoy/ihram-shop',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: "Build Ihram Shop a modern storefront that's quick to load and easy to maintain.",
    problem: 'Ihram Shop wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, Python, JavaScript.',
      'Shipped to production at ihram-shop.vercel.app.',
    ],
    outcome: 'Live in production at ihram-shop.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://ihram-shop.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/ihram-shop',
      },
    ],
    gallery: [],
  },
  {
    slug: 'website',
    name: 'Website',
    tagline: 'TypeScript-built website for BOT Engineers.',
    role: 'Full-stack Developer',
    type: 'company',
    organization: 'BOT Engineers',
    year: '2025',
    date: '2026-06-19',
    status: 'Live',
    featured: false,
    summary:
      'BOT Engineers Bangladesh E commerce Platform A comprehensive e commerce platform for robotics, STEM education, 3D printing services, and tech courses in Bangladesh. Live at bot-engineers.vercel.app.',
    cover: {
      label: 'Website',
      caption: 'TypeScript-built website for BOT Engineers.',
      url: 'https://opengraph.githubassets.com/01e1328e511e240b/BOT-ENGINEERS/website',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: 'Give BOT Engineers a credible digital home that reflects the quality of its work.',
    problem: 'BOT Engineers needed a professional web presence that loads fast and earns trust.',
    build: [
      'Built with TypeScript, Python, JavaScript.',
      'Shipped to production at bot-engineers.vercel.app.',
      'Delivered as part of BOT Engineers.',
    ],
    outcome: 'Live in production at bot-engineers.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://bot-engineers.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/BOT-ENGINEERS/website',
      },
    ],
    gallery: [],
  },
  {
    slug: 'bot-lms',
    name: 'Bot LMS',
    tagline: 'A modern learning platform, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2026',
    date: '2026-06-18',
    status: 'Live',
    featured: false,
    summary:
      'Robotics Learning Platform – Feature Overview A next‑generation LMS designed specifically for hands‑on robotics education. Go beyond static PDFs and empower students to build, simulate, collaborate, and compete – all in one place. Note: This document is the product vision. Live at bot-lms-xi.vercel.app.',
    cover: {
      label: 'Bot LMS',
      caption: 'A modern learning platform, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/6ae79bdefaf5e918/muztahiddurjoy/bot-lms',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: 'Give Bot LMS a fast, dependable learning platform that people genuinely enjoy using.',
    problem:
      'Bot LMS needed a learning platform that loads fast, looks sharp and is simple to run day to day.',
    build: [
      'Built with TypeScript, Python, JavaScript.',
      'Shipped to production at bot-lms-xi.vercel.app.',
    ],
    outcome: 'Live in production at bot-lms-xi.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://bot-lms-xi.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/bot-lms',
      },
    ],
    gallery: [],
  },
  {
    slug: 'enconiya-web',
    name: 'Enconiya Web',
    tagline: 'TypeScript-built website for Enconiya.',
    role: 'Full-stack Developer',
    type: 'company',
    organization: 'Enconiya',
    year: '2026',
    date: '2026-06-16',
    status: 'Live',
    featured: false,
    summary:
      'Enconiya Web is a website built with TypeScript, Python, JavaScript for Enconiya, deployed at enconiya-web.vercel.app.',
    cover: {
      label: 'Enconiya Web',
      caption: 'TypeScript-built website for Enconiya.',
      url: 'https://opengraph.githubassets.com/5fd3b9a60241c85f/muztahiddurjoy/enconiya-web',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: 'Position Enconiya online with a fast, modern site that converts visitors.',
    problem: "Enconiya's brand needed a site that turns visitors into customers.",
    build: [
      'Built with TypeScript, Python, JavaScript.',
      'Shipped to production at enconiya-web.vercel.app.',
    ],
    outcome: 'Live in production at enconiya-web.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://enconiya-web.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/enconiya-web',
      },
    ],
    gallery: [],
  },
  {
    slug: 'magnolia-properties-website',
    name: 'Magnolia Properties Website',
    tagline: 'A modern website, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Magnolia Properties',
    year: '2025',
    date: '2026-06-13',
    status: 'Live',
    featured: false,
    summary:
      'Magnolia Properties Website A full stack real estate marketing website for Magnolia Properties , built with Next.js 16 (frontend) and NestJS 11 (backend). The platform includes a public facing marketing site and a private CMS admin panel. Table of Contents 1. Overview 2. Repository Structure 3. Live at magnolia-properties-website.vercel.app.',
    cover: {
      label: 'Magnolia Properties Website',
      caption: 'A modern website, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/13ddc465c6605596/muztahiddurjoy/magnolia-properties-website',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Magnolia Properties a modern website that's quick to load and easy to maintain.",
    problem:
      'Magnolia Properties wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at magnolia-properties-website.vercel.app.',
    ],
    outcome: 'Live in production at magnolia-properties-website.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://magnolia-properties-website.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/magnolia-properties-website',
      },
    ],
    gallery: [],
  },
  {
    slug: 'zf-foods',
    name: 'ZF Foods',
    tagline: 'TypeScript-built storefront for Appbaksho.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-06-08',
    status: 'Live',
    featured: false,
    summary:
      'ZF Foods is a storefront built with TypeScript, JavaScript for Appbaksho, deployed at zf-foods.vercel.app.',
    cover: {
      label: 'ZF Foods',
      caption: 'TypeScript-built storefront for Appbaksho.',
      url: 'https://opengraph.githubassets.com/c0699af82a98106e/Appbaksho/zf-foods',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give Appbaksho a fast, dependable storefront that people genuinely enjoy using.',
    problem:
      'Appbaksho needed a storefront that loads fast, looks sharp and is simple to run day to day.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at zf-foods.vercel.app.',
      'Delivered as part of Appbaksho.',
    ],
    outcome: 'Live in production at zf-foods.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://zf-foods.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/zf-foods',
      },
    ],
    gallery: [],
  },
  {
    slug: 'shorojontro-online',
    name: 'Shorojontro Online',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-06-04',
    status: 'Shipped',
    featured: false,
    summary:
      'Coup Online This project is an online port of the card game Coup. It is currently hosted at here. Perfect to play with friends during quarantine c: About the project This project consists of two parts 1. The React.js client 2.',
    cover: {
      label: 'Shorojontro Online',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/102d9d73523a7b64/Appbaksho/shorojontro-online',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Appbaksho a modern web app that's quick to load and easy to maintain.",
    problem: 'Appbaksho wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of Appbaksho.'],
    outcome: 'Delivered for Appbaksho.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/shorojontro-online',
      },
    ],
    gallery: [],
  },
  {
    slug: 'appbaksho-web',
    name: 'Appbaksho Web',
    tagline: "Appbaksho's website, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'company',
    organization: 'Appbaksho',
    year: '2024',
    date: '2026-05-30',
    status: 'Live',
    featured: false,
    summary:
      'Appbaksho Web is a website built with TypeScript, JavaScript for Appbaksho, deployed at appbaksho.vercel.app.',
    cover: {
      label: 'Appbaksho Web',
      caption: "Appbaksho's website, engineered end to end.",
      url: 'https://opengraph.githubassets.com/22922c34e595e685/Appbaksho/appbaksho-web',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give Appbaksho a credible digital home that reflects the quality of its work.',
    problem: 'Appbaksho needed a professional web presence that loads fast and earns trust.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at appbaksho.vercel.app.',
      'Delivered as part of Appbaksho.',
    ],
    outcome: 'Live in production at appbaksho.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://appbaksho.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/appbaksho-web',
      },
    ],
    gallery: [],
  },
  {
    slug: 'mt11-gui',
    name: 'MT11 GUI',
    tagline: 'A modern robotics system, shipped on TypeScript.',
    role: 'Robotics Software Engineer',
    type: 'research',
    organization: 'BRACU Mongol-Tori',
    year: '2025',
    date: '2026-05-29',
    status: 'Field-tested',
    featured: false,
    summary:
      'MT11 GUI is a robotics system built with TypeScript, Python, JavaScript for BRACU Mongol-Tori.',
    cover: {
      label: 'MT11 GUI',
      caption: 'A modern robotics system, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/2fe7826d0f8d9e55/bracu-mongoltori/mt11-gui',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Field-tested',
      },
    ],
    stack: ['TypeScript', 'Python', 'JavaScript'],
    vision: 'Make mt11 gui robust enough for unforgiving field conditions.',
    problem: 'MT11 GUI needed to survive rough terrain, tight timing and limited compute.',
    build: [
      'Built with TypeScript, Python, JavaScript.',
      "Delivered as part of BRACU Mongol-Tori's engineering team.",
    ],
    outcome: "Fielded as part of BRACU Mongol-Tori's rover programme.",
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/bracu-mongoltori/mt11-gui',
      },
    ],
    gallery: [],
  },
  {
    slug: 'adsec-pdf-generator',
    name: 'Adsec PDF Generator',
    tagline: 'A modern tool, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2026-05-27',
    status: 'Live',
    featured: false,
    summary:
      'Adsec PDF Generator is a tool built with TypeScript, JavaScript, deployed at adsec-pdf-generator.vercel.app.',
    cover: {
      label: 'Adsec PDF Generator',
      caption: 'A modern tool, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/89d8941f2ef581f8/muztahiddurjoy/adsec-pdf-generator',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Adsec PDF Generator a modern tool that's quick to load and easy to maintain.",
    problem:
      'Adsec PDF Generator wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at adsec-pdf-generator.vercel.app.',
    ],
    outcome: 'Live in production at adsec-pdf-generator.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://adsec-pdf-generator.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/adsec-pdf-generator',
      },
    ],
    gallery: [],
  },
  {
    slug: 'touchpad-lms',
    name: 'Touchpad LMS',
    tagline: "Appbaksho's learning platform, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-05-25',
    status: 'Shipped',
    featured: false,
    summary: 'Touchpad LMS is a learning platform built with TypeScript, JavaScript for Appbaksho.',
    cover: {
      label: 'Touchpad LMS',
      caption: "Appbaksho's learning platform, engineered end to end.",
      url: 'https://opengraph.githubassets.com/beb04992015c4aea/Appbaksho/touchpad-lms',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision:
      'Give Appbaksho a fast, dependable learning platform that people genuinely enjoy using.',
    problem:
      'Appbaksho needed a learning platform that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of Appbaksho.'],
    outcome: 'Delivered for Appbaksho.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/touchpad-lms',
      },
    ],
    gallery: [],
  },
  {
    slug: 'wellness-hospital',
    name: 'Wellness Hospital',
    tagline: 'TypeScript-built website for Wellness Hospital.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2026',
    date: '2026-05-22',
    status: 'Live',
    featured: false,
    summary:
      'Wellness Hospital — Next.js Website Opinionated developer guide and onboarding for contributors who will maintain, run, and extend this project. This repository is a content driven marketing site built with Next.js (App Router), TypeScript and Tailwind CSS. Live at wellness-hospital-three.vercel.app.',
    cover: {
      label: 'Wellness Hospital',
      caption: 'TypeScript-built website for Wellness Hospital.',
      url: 'https://opengraph.githubassets.com/770a0ff887d5d7df/muztahiddurjoy/wellness-hospital',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision:
      "Turn Wellness Hospital's requirements into a polished website shipped on a current stack.",
    problem:
      'Wellness Hospital needed a reliable website that could ship quickly without cutting corners.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at wellness-hospital-three.vercel.app.',
    ],
    outcome: 'Live in production at wellness-hospital-three.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://wellness-hospital-three.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/wellness-hospital',
      },
    ],
    gallery: [],
  },
  {
    slug: 'family-gold',
    name: 'Family Gold',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2026',
    date: '2026-04-18',
    status: 'Live',
    featured: false,
    summary:
      'Family Gold is a web app built with TypeScript, JavaScript, deployed at family-gold-three.vercel.app.',
    cover: {
      label: 'Family Gold',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/f28868bff9c75b26/muztahiddurjoy/family-gold',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Family Gold a production-grade web app that scales with the business.',
    problem: 'Family Gold required a web app that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at family-gold-three.vercel.app.',
    ],
    outcome: 'Live in production at family-gold-three.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://family-gold-three.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/family-gold',
      },
    ],
    gallery: [],
  },
  {
    slug: 'zf-delivery-app',
    name: 'ZF Delivery App',
    tagline: 'A modern storefront, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2026',
    date: '2026-03-15',
    status: 'Shipped',
    featured: false,
    summary: 'ZF Delivery App is a storefront built with TypeScript, JavaScript for Appbaksho.',
    cover: {
      label: 'ZF Delivery App',
      caption: 'A modern storefront, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/3bd8f3e33682fa79/Appbaksho/zf-delivery-app',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Appbaksho a production-grade storefront that scales with the business.',
    problem: 'Appbaksho required a storefront that works on every device and is easy to extend.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of Appbaksho.'],
    outcome: 'Delivered for Appbaksho.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/zf-delivery-app',
      },
    ],
    gallery: [],
  },
  {
    slug: 'adsec-corporate',
    name: 'Adsec Corporate',
    tagline: 'Website crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2023',
    date: '2026-03-05',
    status: 'Live',
    featured: false,
    summary:
      'Adsec Corporate is a website built with TypeScript, JavaScript, deployed at adsec-corporate.vercel.app.',
    cover: {
      label: 'Adsec Corporate',
      caption: 'Website crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/950b0c3b6a72cea5/muztahiddurjoy/adsec-corporate',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Adsec Corporate a modern website that's quick to load and easy to maintain.",
    problem:
      'Adsec Corporate wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at adsec-corporate.vercel.app.',
    ],
    outcome: 'Live in production at adsec-corporate.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://adsec-corporate.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/adsec-corporate',
      },
    ],
    gallery: [],
  },
  {
    slug: 'icn-website',
    name: 'ICN Website',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'ICN',
    year: '2026',
    date: '2026-02-16',
    status: 'Live',
    featured: false,
    summary:
      'ICN Website is a web app built with TypeScript, JavaScript for ICN, deployed at icn-website-sigma.vercel.app.',
    cover: {
      label: 'ICN Website',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/0872c4e9563fdb82/muztahiddurjoy/icn-website',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Turn ICN's requirements into a polished web app shipped on a current stack.",
    problem: 'ICN needed a reliable web app that could ship quickly without cutting corners.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at icn-website-sigma.vercel.app.',
    ],
    outcome: 'Live in production at icn-website-sigma.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://icn-website-sigma.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/icn-website',
      },
    ],
    gallery: [],
  },
  {
    slug: 'alif-business-consultant-next',
    name: 'Alif Business Consultant',
    tagline: 'A modern website, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2026-02-12',
    status: 'Live',
    featured: false,
    summary:
      'Alif Business Consultant is a website built with TypeScript, JavaScript, deployed at v0-industrial-consultancy-website.vercel.app.',
    cover: {
      label: 'Alif Business Consultant',
      caption: 'A modern website, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/08f8433e6f821823/muztahiddurjoy/alif-business-consultant-next',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision:
      "Build Alif Business Consultant a modern website that's quick to load and easy to maintain.",
    problem:
      'Alif Business Consultant wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at v0-industrial-consultancy-website.vercel.app.',
    ],
    outcome: 'Live in production at v0-industrial-consultancy-website.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://v0-industrial-consultancy-website.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/alif-business-consultant-next',
      },
    ],
    gallery: [],
  },
  {
    slug: 'intredia-sentinel',
    name: 'Intredia Sentinel',
    tagline: "Intredia's platform, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2026',
    date: '2026-02-07',
    status: 'Shipped',
    featured: false,
    summary: 'Intredia Sentinel is a platform built with a modern stack for Intredia.',
    cover: {
      label: 'Intredia Sentinel',
      caption: "Intredia's platform, engineered end to end.",
      url: 'https://opengraph.githubassets.com/47da5b63c216497f/Intredia-Inc/intredia-sentinel',
    },
    metrics: [
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: [],
    vision: "Build Intredia a modern platform that's quick to load and easy to maintain.",
    problem: 'Intredia wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: ['Built with a modern stack.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/intredia-sentinel',
      },
    ],
    gallery: [],
  },
  {
    slug: 'lazygo-web',
    name: 'Lazygo Web',
    tagline: "Lazygo's web app, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Lazygo',
    year: '2025',
    date: '2026-01-31',
    status: 'Live',
    featured: false,
    summary:
      'LazyGo Portfolio Website Team LazyGo World Robot Olympiad Medalists 📖 About This is the official portfolio website for Team LazyGo , a Bangladeshi robotics team that has achieved remarkable success in the World Robot Olympiad (WRO). Live at v0-lazygo-portfolio-website.vercel.app.',
    cover: {
      label: 'Lazygo Web',
      caption: "Lazygo's web app, engineered end to end.",
      url: 'https://opengraph.githubassets.com/de53df004f577ce9/muztahiddurjoy/lazygo-web',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Lazygo a production-grade web app that scales with the business.',
    problem: 'Lazygo required a web app that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at v0-lazygo-portfolio-website.vercel.app.',
    ],
    outcome: 'Live in production at v0-lazygo-portfolio-website.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://v0-lazygo-portfolio-website.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/lazygo-web',
      },
    ],
    gallery: [],
  },
  {
    slug: 'faisal-e-mart',
    name: 'Faisal E Mart',
    tagline: 'Credit-based e-commerce site for Faisal Express',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2024',
    date: '2026-01-29',
    status: 'Shipped',
    featured: false,
    summary: 'Credit-based e-commerce site for Faisal Express',
    cover: {
      label: 'Faisal E Mart',
      caption: 'Credit-based e-commerce site for Faisal Express',
      url: 'https://opengraph.githubassets.com/26350c94d729f6a2/BinduLogic/faisal-e-mart',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'Kotlin', 'JavaScript'],
    vision: 'Give BinduLogic a fast, dependable storefront that people genuinely enjoy using.',
    problem:
      'BinduLogic needed a storefront that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with TypeScript, Kotlin, JavaScript.', 'Delivered as part of BinduLogic.'],
    outcome: 'Delivered for BinduLogic.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/faisal-e-mart',
      },
    ],
    gallery: [],
  },
  {
    slug: 'wearsnob',
    name: 'Wearsnob',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2026-01-26',
    status: 'Live',
    featured: false,
    summary:
      'Wearsnob is a web app built with TypeScript, JavaScript, deployed at wearsnob.vercel.app.',
    cover: {
      label: 'Wearsnob',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/60187a12df16cc00/muztahiddurjoy/wearsnob',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Wearsnob a modern web app that's quick to load and easy to maintain.",
    problem: 'Wearsnob wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at wearsnob.vercel.app.'],
    outcome: 'Live in production at wearsnob.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://wearsnob.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/wearsnob',
      },
    ],
    gallery: [],
  },
  {
    slug: 'binduhealth-e-ticketing-client',
    name: 'Binduhealth E Ticketing Client',
    tagline: 'A modern tool, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2023',
    date: '2026-01-22',
    status: 'Shipped',
    featured: false,
    summary: 'Binduhealth E Ticketing Client is a tool built with TypeScript for BinduLogic.',
    cover: {
      label: 'Binduhealth E Ticketing Client',
      caption: 'A modern tool, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/c31f16703fac1241/BinduLogic/binduhealth-e-ticketing-client',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript'],
    vision: "Turn BinduLogic's requirements into a polished tool shipped on a current stack.",
    problem: 'BinduLogic needed a reliable tool that could ship quickly without cutting corners.',
    build: ['Built with TypeScript.', 'Delivered as part of BinduLogic.'],
    outcome: 'Delivered for BinduLogic.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/binduhealth-e-ticketing-client',
      },
    ],
    gallery: [],
  },
  {
    slug: 'alif-haramain-services',
    name: 'Alif Haramain Services',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Alif Haramain',
    year: '2026',
    date: '2026-01-08',
    status: 'Live',
    featured: false,
    summary:
      'Alif Haramain Services is a web app built with TypeScript, JavaScript for Alif Haramain, deployed at alif-haramain-services.vercel.app.',
    cover: {
      label: 'Alif Haramain Services',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/7f67e17f40a63de1/muztahiddurjoy/alif-haramain-services',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Turn Alif Haramain's requirements into a polished web app shipped on a current stack.",
    problem:
      'Alif Haramain needed a reliable web app that could ship quickly without cutting corners.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at alif-haramain-services.vercel.app.',
    ],
    outcome: 'Live in production at alif-haramain-services.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://alif-haramain-services.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/alif-haramain-services',
      },
    ],
    gallery: [],
  },
  {
    slug: 'build-your-project',
    name: 'Build Your Project',
    tagline: 'TypeScript-built web app for BOT Engineers.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BOT Engineers',
    year: '2025',
    date: '2025-12-14',
    status: 'Live',
    featured: false,
    summary:
      'Build Your Project is a web app built with TypeScript, JavaScript for BOT Engineers, deployed at build-your-project.vercel.app.',
    cover: {
      label: 'Build Your Project',
      caption: 'TypeScript-built web app for BOT Engineers.',
      url: 'https://opengraph.githubassets.com/65ae670b3899640ecf6875144923a41211bde846acba4fb57aaef7569bcddd7c/BOT-ENGINEERS/build-your-project',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give BOT Engineers a fast, dependable web app that people genuinely enjoy using.',
    problem:
      'BOT Engineers needed a web app that loads fast, looks sharp and is simple to run day to day.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at build-your-project.vercel.app.',
      'Delivered as part of BOT Engineers.',
    ],
    outcome: 'Live in production at build-your-project.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://build-your-project.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/BOT-ENGINEERS/build-your-project',
      },
    ],
    gallery: [],
  },
  {
    slug: 'steamstore',
    name: 'Steamstore',
    tagline: "Steamstore's storefront, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2025-11-29',
    status: 'Live',
    featured: false,
    summary:
      'E commerce gaming website Automatically synced with your v0.app deployments Overview This repository will stay in sync with your deployed chats on v0.app. Any changes you make to your deployed app will be automatically pushed to this repository from v0.app. Live at v0-e-commerce-gaming-website-cyan.vercel.app.',
    cover: {
      label: 'Steamstore',
      caption: "Steamstore's storefront, engineered end to end.",
      url: 'https://opengraph.githubassets.com/656806c589c1c60c/muztahiddurjoy/steamstore',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give Steamstore a fast, dependable storefront that people genuinely enjoy using.',
    problem:
      'Steamstore needed a storefront that loads fast, looks sharp and is simple to run day to day.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at v0-e-commerce-gaming-website-cyan.vercel.app.',
    ],
    outcome: 'Live in production at v0-e-commerce-gaming-website-cyan.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://v0-e-commerce-gaming-website-cyan.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/steamstore',
      },
    ],
    gallery: [],
  },
  {
    slug: 'visyouals-next',
    name: 'Visyouals',
    tagline: "Visyouals's website, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'company',
    organization: '',
    year: '2025',
    date: '2025-11-21',
    status: 'Live',
    featured: false,
    summary:
      'Visyouals is a website built with TypeScript, JavaScript, deployed at visyouals-next-studio.vercel.app.',
    cover: {
      label: 'Visyouals',
      caption: "Visyouals's website, engineered end to end.",
      url: 'https://opengraph.githubassets.com/adef548bd81873fd/muztahiddurjoy/visyouals-next',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give Visyouals a credible digital home that reflects the quality of its work.',
    problem: 'Visyouals needed a professional web presence that loads fast and earns trust.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at visyouals-next-studio.vercel.app.',
    ],
    outcome: 'Live in production at visyouals-next-studio.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://visyouals-next-studio.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/visyouals-next',
      },
    ],
    gallery: [],
  },
  {
    slug: 'jogesh',
    name: 'Jogesh',
    tagline: "Jogesh's web app, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2021',
    date: '2025-11-02',
    status: 'Live',
    featured: false,
    summary:
      'Jogesh Discord Bot A Discord bot built with Discord.js v14, TypeScript, and SQLite (Prisma ORM). Live at discordbot-zeta.vercel.app.',
    cover: {
      label: 'Jogesh',
      caption: "Jogesh's web app, engineered end to end.",
      url: 'https://opengraph.githubassets.com/3067a56719bdd735/muztahiddurjoy/jogesh',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript'],
    vision: "Build Jogesh a modern web app that's quick to load and easy to maintain.",
    problem: 'Jogesh wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: ['Built with TypeScript.', 'Shipped to production at discordbot-zeta.vercel.app.'],
    outcome: 'Live in production at discordbot-zeta.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'discordbot-zeta.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/jogesh',
      },
    ],
    gallery: [],
  },
  {
    slug: 'licence-schedule-mt',
    name: 'Licence Schedule Mt',
    tagline: 'A modern tool, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2025-09-04',
    status: 'Live',
    featured: false,
    summary:
      'Licence Schedule Mt is a tool built with TypeScript, JavaScript, deployed at licence-schedule-mt.vercel.app.',
    cover: {
      label: 'Licence Schedule Mt',
      caption: 'A modern tool, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/934a0362881e3182/muztahiddurjoy/licence-schedule-mt',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Licence Schedule Mt a modern tool that's quick to load and easy to maintain.",
    problem:
      'Licence Schedule Mt wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at licence-schedule-mt.vercel.app.',
    ],
    outcome: 'Live in production at licence-schedule-mt.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://licence-schedule-mt.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/licence-schedule-mt',
      },
    ],
    gallery: [],
  },
  {
    slug: 'lfr',
    name: 'LFR',
    tagline: 'Codes, documentation for lfr',
    role: 'Robotics Software Engineer',
    type: 'robotics',
    organization: 'BOT Engineers',
    year: '2025',
    date: '2025-09-03',
    status: 'Field-tested',
    featured: false,
    summary: 'LFR is a line-following robot built with C++ for BOT Engineers.',
    cover: {
      label: 'LFR',
      caption: 'Codes, documentation for lfr',
      url: 'https://opengraph.githubassets.com/f5ae3c30019cb6d3/BOT-ENGINEERS/LFR-',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'C++',
      },
      {
        label: 'Status',
        value: 'Field-tested',
      },
    ],
    stack: ['C++'],
    vision: 'Engineer a dependable lfr that holds up in the field.',
    problem: 'LFR had to run in real time on limited embedded hardware.',
    build: ['Built with C++.', "Delivered as part of BOT Engineers's engineering team."],
    outcome: 'Deployed with BOT Engineers.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BOT-ENGINEERS/LFR-',
      },
    ],
    gallery: [],
  },
  {
    slug: 'lifeline',
    name: 'Lifeline',
    tagline: 'Mobile application for blood donor finding',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2024',
    date: '2025-08-31',
    status: 'Shipped',
    featured: false,
    summary: 'Mobile application for blood donor finding',
    cover: {
      label: 'Lifeline',
      caption: 'Mobile application for blood donor finding',
      url: 'https://opengraph.githubassets.com/26083124119c3447/BinduLogic/Lifeline',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver BinduLogic a production-grade web app that scales with the business.',
    problem: 'BinduLogic required a web app that works on every device and is easy to extend.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of BinduLogic.'],
    outcome: 'Delivered for BinduLogic.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/Lifeline',
      },
    ],
    gallery: [],
  },
  {
    slug: 'urban',
    name: 'Urban',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Appbaksho',
    year: '2024',
    date: '2025-08-22',
    status: 'Shipped',
    featured: false,
    summary: 'Urban is a web app built with TypeScript, JavaScript for Appbaksho.',
    cover: {
      label: 'Urban',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/6f2dd1b128796598/Appbaksho/urban',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Appbaksho a production-grade web app that scales with the business.',
    problem: 'Appbaksho required a web app that works on every device and is easy to extend.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of Appbaksho.'],
    outcome: 'Delivered for Appbaksho.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Appbaksho/urban',
      },
    ],
    gallery: [],
  },
  {
    slug: 'scaledge',
    name: 'Scaledge',
    tagline: 'A modern website, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'company',
    organization: '',
    year: '2025',
    date: '2025-08-10',
    status: 'Live',
    featured: false,
    summary:
      'Scaledge is a website built with TypeScript, JavaScript, deployed at scaledge.vercel.app.',
    cover: {
      label: 'Scaledge',
      caption: 'A modern website, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/8a5a5d1bcef7a304/muztahiddurjoy/scaledge',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Position Scaledge online with a fast, modern site that converts visitors.',
    problem: "Scaledge's brand needed a site that turns visitors into customers.",
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at scaledge.vercel.app.'],
    outcome: 'Live in production at scaledge.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://scaledge.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/scaledge',
      },
    ],
    gallery: [],
  },
  {
    slug: 'mt10-rover',
    name: 'MT10 Rover',
    tagline: 'A modern autonomous rover, shipped on C++.',
    role: 'Robotics Software Engineer',
    type: 'research',
    organization: 'BRACU Mongol-Tori',
    year: '2025',
    date: '2025-06-28',
    status: 'Field-tested',
    featured: false,
    summary:
      'MT10 Rover Autonomous Navigation System Overview The MT10 Rover is an autonomous robot system built on ROS2 that can navigate using GPS waypoints, detect objects using computer vision, and perform various missions.',
    cover: {
      label: 'MT10 Rover',
      caption: 'A modern autonomous rover, shipped on C++.',
      url: 'https://opengraph.githubassets.com/bda64f0147b2c88e/bracu-mongoltori/mt10-rover',
    },
    metrics: [
      {
        label: 'GitHub stars',
        value: '1',
        proof: true,
      },
      {
        label: 'Primary stack',
        value: 'C++',
      },
      {
        label: 'Status',
        value: 'Field-tested',
      },
    ],
    stack: ['C++', 'Python', 'CMake', 'JavaScript'],
    vision: 'Engineer a dependable mt10 rover that performs under real competition constraints.',
    problem: 'MT10 Rover had to run reliably on constrained hardware with real-time control.',
    build: [
      'Built with C++, Python, CMake, JavaScript.',
      "Delivered as part of BRACU Mongol-Tori's engineering team.",
    ],
    outcome: "Fielded as part of BRACU Mongol-Tori's rover programme.",
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/bracu-mongoltori/mt10-rover',
      },
    ],
    gallery: [],
  },
  {
    slug: 'discord-bot',
    name: 'Discord Bot',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BOT Engineers',
    year: '2025',
    date: '2025-05-30',
    status: 'Shipped',
    featured: false,
    summary:
      'Discord Bot TypeScript Template Discord bot A discord.js bot template written with TypeScript.',
    cover: {
      label: 'Discord Bot',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/f16ff4c67a81ee5c/BOT-ENGINEERS/discord-bot',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript'],
    vision: 'Deliver BOT Engineers a production-grade web app that scales with the business.',
    problem: 'BOT Engineers required a web app that works on every device and is easy to extend.',
    build: ['Built with TypeScript.', 'Delivered as part of BOT Engineers.'],
    outcome: 'Delivered for BOT Engineers.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BOT-ENGINEERS/discord-bot',
      },
    ],
    gallery: [],
  },
  {
    slug: 'binduhealth-e-ticketing-mobile-app',
    name: 'Binduhealth E Ticketing Mobile App',
    tagline: 'TypeScript-built tool for BinduLogic.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2025',
    date: '2025-05-28',
    status: 'Shipped',
    featured: false,
    summary:
      'Starter base A starting point to help you set up your project quickly and use the common components provided by . The idea is to make it easier for you to get started.',
    cover: {
      label: 'Binduhealth E Ticketing Mobile App',
      caption: 'TypeScript-built tool for BinduLogic.',
      url: 'https://opengraph.githubassets.com/4c4a338a73359929/BinduLogic/binduhealth-e-ticketing-mobile-app',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build BinduLogic a modern tool that's quick to load and easy to maintain.",
    problem: 'BinduLogic wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of BinduLogic.'],
    outcome: 'Delivered for BinduLogic.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/binduhealth-e-ticketing-mobile-app',
      },
    ],
    gallery: [],
  },
  {
    slug: 'masteradmin',
    name: 'Masteradmin',
    tagline: 'A modern platform, shipped on a modern stack.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2025',
    date: '2025-05-13',
    status: 'Shipped',
    featured: false,
    summary: 'Masteradmin is a platform built with a modern stack for Intredia.',
    cover: {
      label: 'Masteradmin',
      caption: 'A modern platform, shipped on a modern stack.',
      url: 'https://opengraph.githubassets.com/3c21783390055b36/Intredia-Inc/masteradmin',
    },
    metrics: [
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: [],
    vision: 'Give Intredia a fast, dependable platform that people genuinely enjoy using.',
    problem:
      'Intredia needed a platform that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with a modern stack.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/masteradmin',
      },
    ],
    gallery: [],
  },
  {
    slug: 'coretextile',
    name: 'CoreTextile',
    tagline: 'Web App crafted with JavaScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2025',
    date: '2025-05-11',
    status: 'Shipped',
    featured: false,
    summary: 'CoreTextile is a web app built with JavaScript for Intredia.',
    cover: {
      label: 'CoreTextile',
      caption: 'Web App crafted with JavaScript.',
      url: 'https://opengraph.githubassets.com/85657e74620fcd38/Intredia-Inc/CoreTextile',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'JavaScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['JavaScript'],
    vision: 'Give Intredia a fast, dependable web app that people genuinely enjoy using.',
    problem:
      'Intredia needed a web app that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with JavaScript.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/CoreTextile',
      },
    ],
    gallery: [],
  },
  {
    slug: 'customerrfq',
    name: 'CustomerRFQ',
    tagline: 'TypeScript-built tool for Intredia.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2025',
    date: '2025-05-01',
    status: 'Shipped',
    featured: false,
    summary: 'CustomerRFQ is a tool built with TypeScript, JavaScript for Intredia.',
    cover: {
      label: 'CustomerRFQ',
      caption: 'TypeScript-built tool for Intredia.',
      url: 'https://opengraph.githubassets.com/b4fc39ae5bdd9e15/Intredia-Inc/customerRFQ',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Turn Intredia's requirements into a polished tool shipped on a current stack.",
    problem: 'Intredia needed a reliable tool that could ship quickly without cutting corners.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/customerRFQ',
      },
    ],
    gallery: [],
  },
  {
    slug: 'cartplug',
    name: 'Cartplug',
    tagline: 'Storefront crafted with a modern stack.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2025',
    date: '2025-04-29',
    status: 'Shipped',
    featured: false,
    summary: 'Cartplug is a storefront built with a modern stack for Intredia.',
    cover: {
      label: 'Cartplug',
      caption: 'Storefront crafted with a modern stack.',
      url: 'https://opengraph.githubassets.com/f945270109f82e7e/Intredia-Inc/cartplug',
    },
    metrics: [
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: [],
    vision: 'Give Intredia a fast, dependable storefront that people genuinely enjoy using.',
    problem:
      'Intredia needed a storefront that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with a modern stack.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/cartplug',
      },
    ],
    gallery: [],
  },
  {
    slug: 'druti',
    name: 'Druti',
    tagline: "BinduLogic's web app, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2025',
    date: '2025-03-26',
    status: 'Shipped',
    featured: false,
    summary: 'Druti is a web app built with TypeScript, JavaScript for BinduLogic.',
    cover: {
      label: 'Druti',
      caption: "BinduLogic's web app, engineered end to end.",
      url: 'https://opengraph.githubassets.com/5141b8fc6edee8cb/BinduLogic/Druti',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver BinduLogic a production-grade web app that scales with the business.',
    problem: 'BinduLogic required a web app that works on every device and is easy to extend.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of BinduLogic.'],
    outcome: 'Delivered for BinduLogic.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/Druti',
      },
    ],
    gallery: [],
  },
  {
    slug: 'pixeroid',
    name: 'Pixeroid',
    tagline: "Pixeroid's web app, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2025-03-09',
    status: 'Live',
    featured: false,
    summary:
      'Pixeroid is a web app built with TypeScript, JavaScript, deployed at pixeroid.vercel.app.',
    cover: {
      label: 'Pixeroid',
      caption: "Pixeroid's web app, engineered end to end.",
      url: 'https://opengraph.githubassets.com/0f12fb901e7593d3/muztahiddurjoy/pixeroid',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Pixeroid a production-grade web app that scales with the business.',
    problem: 'Pixeroid required a web app that works on every device and is easy to extend.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at pixeroid.vercel.app.'],
    outcome: 'Live in production at pixeroid.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://pixeroid.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/pixeroid',
      },
    ],
    gallery: [],
  },
  {
    slug: 'dakbaksho-chitrolekha',
    name: 'Dakbaksho Chitrolekha',
    tagline: "Dakbaksho Chitrolekha's web app, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2025',
    date: '2025-02-26',
    status: 'Live',
    featured: false,
    summary:
      'Dakbaksho Chitrolekha is a web app built with TypeScript, JavaScript, deployed at dakbaksho-chitrolekha.vercel.app.',
    cover: {
      label: 'Dakbaksho Chitrolekha',
      caption: "Dakbaksho Chitrolekha's web app, engineered end to end.",
      url: 'https://opengraph.githubassets.com/99e8eb96cdc1c819deb66b0fcffb6facd09f2c781867f9ae3edcc586e546798f/muztahiddurjoy/dakbaksho-chitrolekha',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision:
      'Give Dakbaksho Chitrolekha a fast, dependable web app that people genuinely enjoy using.',
    problem:
      'Dakbaksho Chitrolekha needed a web app that loads fast, looks sharp and is simple to run day to day.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at dakbaksho-chitrolekha.vercel.app.',
    ],
    outcome: 'Live in production at dakbaksho-chitrolekha.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://dakbaksho-chitrolekha.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/dakbaksho-chitrolekha',
      },
    ],
    gallery: [],
  },
  {
    slug: 'creative-logistics',
    name: 'Creative Logistics',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2023',
    date: '2024-11-29',
    status: 'Live',
    featured: false,
    summary:
      'Creative Logistics is a web app built with TypeScript, JavaScript, deployed at creative-logistics.vercel.app.',
    cover: {
      label: 'Creative Logistics',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/0dbad2ecef9056f4/muztahiddurjoy/creative-logistics',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Creative Logistics a modern web app that's quick to load and easy to maintain.",
    problem:
      'Creative Logistics wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at creative-logistics.vercel.app.',
    ],
    outcome: 'Live in production at creative-logistics.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://creative-logistics.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/creative-logistics',
      },
    ],
    gallery: [],
  },
  {
    slug: 'manuport-logistics',
    name: 'Manuport Logistics',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2024',
    date: '2024-11-07',
    status: 'Live',
    featured: false,
    summary:
      'A minimal Next.js site with Sanity Studio This starter is a statically generated site that uses [Next.js][nextjs] for the frontend and [Sanity][sanity homepage] to handle its content. Live at manuport-logistics-zeta.vercel.app.',
    cover: {
      label: 'Manuport Logistics',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/e29eb578b957d275/muztahiddurjoy/manuport-logistics',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Manuport Logistics a production-grade web app that scales with the business.',
    problem:
      'Manuport Logistics required a web app that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at manuport-logistics-zeta.vercel.app.',
    ],
    outcome: 'Live in production at manuport-logistics-zeta.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://manuport-logistics-zeta.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/manuport-logistics',
      },
    ],
    gallery: [],
  },
  {
    slug: 'muazuddin-steel-industry',
    name: 'Muazuddin Steel Industry',
    tagline: "Muazuddin Steel Industry's website, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2024',
    date: '2024-11-04',
    status: 'Live',
    featured: false,
    summary:
      "Next.js + Sanity: A Powerful Website Starter with Real time Visual Editing the website this template generates Visual Editing using Sanity's Presentation Tool This starter is a statically generated website and blog built with Next.js 15 (App Router) for the frontend and powered by [Sanity][sanity ho. Live at muazuddin-steel-industry.vercel.app.",
    cover: {
      label: 'Muazuddin Steel Industry',
      caption: "Muazuddin Steel Industry's website, engineered end to end.",
      url: 'https://opengraph.githubassets.com/cd9e184f0473f61f/muztahiddurjoy/muazuddin-steel-industry',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision:
      'Give Muazuddin Steel Industry a fast, dependable website that people genuinely enjoy using.',
    problem:
      'Muazuddin Steel Industry needed a website that loads fast, looks sharp and is simple to run day to day.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at muazuddin-steel-industry.vercel.app.',
    ],
    outcome: 'Live in production at muazuddin-steel-industry.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://muazuddin-steel-industry.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/muazuddin-steel-industry',
      },
    ],
    gallery: [],
  },
  {
    slug: 'eagle-security-services',
    name: 'Eagle Security Services',
    tagline: 'A modern website, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Eagle Security',
    year: '2024',
    date: '2024-10-25',
    status: 'Live',
    featured: false,
    summary:
      'A minimal Next.js site with Sanity Studio This starter is a statically generated site that uses [Next.js][nextjs] for the frontend and [Sanity][sanity homepage] to handle its content. Live at eagle-security-services-ktvy.vercel.app.',
    cover: {
      label: 'Eagle Security Services',
      caption: 'A modern website, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/e3e3929207d62682/muztahiddurjoy/eagle-security-services',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Eagle Security a production-grade website that scales with the business.',
    problem: 'Eagle Security required a website that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at eagle-security-services-ktvy.vercel.app.',
    ],
    outcome: 'Live in production at eagle-security-services-ktvy.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://eagle-security-services-ktvy.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/eagle-security-services',
      },
    ],
    gallery: [],
  },
  {
    slug: 'enconiya-donations',
    name: 'Enconiya Donations',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2024',
    date: '2024-08-25',
    status: 'Live',
    featured: false,
    summary:
      'Enconiya Donations is a web app built with TypeScript, JavaScript, deployed at enconiya-donations.vercel.app.',
    cover: {
      label: 'Enconiya Donations',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/5af4e59c63b00be2/muztahiddurjoy/enconiya-donations',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Enconiya Donations a production-grade web app that scales with the business.',
    problem:
      'Enconiya Donations required a web app that works on every device and is easy to extend.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at enconiya-donations.vercel.app.',
    ],
    outcome: 'Live in production at enconiya-donations.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://enconiya-donations.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/enconiya-donations',
      },
    ],
    gallery: [],
  },
  {
    slug: 'gunijon-foundation',
    name: 'Gunijon Foundation',
    tagline: 'JavaScript-built website for Gunijon.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Gunijon',
    year: '2024',
    date: '2024-08-16',
    status: 'Live',
    featured: false,
    summary:
      'Gunijon Foundation is a website built with JavaScript for Gunijon, deployed at gunijon-foundation.vercel.app.',
    cover: {
      label: 'Gunijon Foundation',
      caption: 'JavaScript-built website for Gunijon.',
      url: 'https://opengraph.githubassets.com/93bab7e9f1b0f29d/muztahiddurjoy/Gunijon-Foundation',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'HTML',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['JavaScript'],
    vision: "Build Gunijon a modern website that's quick to load and easy to maintain.",
    problem: 'Gunijon wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: ['Built with JavaScript.', 'Shipped to production at gunijon-foundation.vercel.app.'],
    outcome: 'Live in production at gunijon-foundation.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://gunijon-foundation.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/Gunijon-Foundation',
      },
    ],
    gallery: [],
  },
  {
    slug: 'ongona-landing',
    name: 'Ongona Landing',
    tagline: 'A modern website, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Ongona',
    year: '2023',
    date: '2024-08-02',
    status: 'Live',
    featured: false,
    summary:
      'Ongona Landing Page Landing Page for Ongona The Security App Installation Install Node JS first or Page Details Page Name Slug Destination : : : Stack Used Name Link : : Next JS 13 shadcn UI Vercel Postgres Email JS Lucide Icons Tailwind CSS GSAP Swiper Split Type Axios TypeScript Developers muztahi. Live at ongona.vercel.app.',
    cover: {
      label: 'Ongona Landing',
      caption: 'A modern website, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/b105985beff917e4/muztahiddurjoy/ongona-landing',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Ongona a modern website that's quick to load and easy to maintain.",
    problem: 'Ongona wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at ongona.vercel.app.'],
    outcome: 'Live in production at ongona.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://ongona.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/ongona-landing',
      },
    ],
    gallery: [],
  },
  {
    slug: 'enconiya-invoice',
    name: 'Enconiya Invoice',
    tagline: 'Invoice portal for invoice verify, check and other invoice related stuffs',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2024',
    date: '2024-06-06',
    status: 'Live',
    featured: false,
    summary:
      'Enconiya Invoice Invoice portal for invoice verify, check and other invoice related stuffs. Live at enconiya-invoice-frontend.vercel.app.',
    cover: {
      label: 'Enconiya Invoice',
      caption: 'Invoice portal for invoice verify, check and other invoice related stuffs',
      url: 'https://opengraph.githubassets.com/5034ad303c1c5b37/muztahiddurjoy/Enconiya-Invoice',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Enconiya Invoice a modern platform that's quick to load and easy to maintain.",
    problem:
      'Enconiya Invoice wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at enconiya-invoice-frontend.vercel.app.',
    ],
    outcome: 'Live in production at enconiya-invoice-frontend.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://enconiya-invoice-frontend.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/Enconiya-Invoice',
      },
    ],
    gallery: [],
  },
  {
    slug: 'intredia-identity-backend',
    name: 'Intredia Identity Backend',
    tagline: "Intredia's platform, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2024',
    date: '2024-03-16',
    status: 'Shipped',
    featured: false,
    summary: 'Intredia Identity Backend is a platform built with JavaScript for Intredia.',
    cover: {
      label: 'Intredia Identity Backend',
      caption: "Intredia's platform, engineered end to end.",
      url: 'https://opengraph.githubassets.com/736f222645efa30d/Intredia-Inc/Intredia_Identity_Backend',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'JavaScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['JavaScript'],
    vision: "Turn Intredia's requirements into a polished platform shipped on a current stack.",
    problem: 'Intredia needed a reliable platform that could ship quickly without cutting corners.',
    build: ['Built with JavaScript.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/Intredia_Identity_Backend',
      },
    ],
    gallery: [],
  },
  {
    slug: 'biluibaba-web',
    name: 'Biluibaba Web',
    tagline: 'TypeScript-built web app for Biluibaba.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Biluibaba',
    year: '2024',
    date: '2024-03-04',
    status: 'Live',
    featured: false,
    summary:
      'Biluibaba Web is a web app built with TypeScript, JavaScript for Biluibaba, deployed at biluibaba.vercel.app.',
    cover: {
      label: 'Biluibaba Web',
      caption: 'TypeScript-built web app for Biluibaba.',
      url: 'https://opengraph.githubassets.com/0e22470e9f5589b2/muztahiddurjoy/biluibaba-web',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Turn Biluibaba's requirements into a polished web app shipped on a current stack.",
    problem: 'Biluibaba needed a reliable web app that could ship quickly without cutting corners.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at biluibaba.vercel.app.'],
    outcome: 'Live in production at biluibaba.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://biluibaba.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/biluibaba-web',
      },
    ],
    gallery: [],
  },
  {
    slug: 'launchpad',
    name: 'Launchpad',
    tagline: 'TypeScript-built web app for Intredia.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2024',
    date: '2024-01-22',
    status: 'Shipped',
    featured: false,
    summary: 'Launchpad is a web app built with TypeScript, JavaScript for Intredia.',
    cover: {
      label: 'Launchpad',
      caption: 'TypeScript-built web app for Intredia.',
      url: 'https://opengraph.githubassets.com/010965bd44547756/Intredia-Inc/Launchpad',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Turn Intredia's requirements into a polished web app shipped on a current stack.",
    problem: 'Intredia needed a reliable web app that could ship quickly without cutting corners.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/Launchpad',
      },
    ],
    gallery: [],
  },
  {
    slug: 'sky-cart',
    name: 'Sky Cart',
    tagline: 'A modern storefront, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2023',
    date: '2023-12-20',
    status: 'Live',
    featured: false,
    summary:
      'Sky Cart is a storefront built with TypeScript, JavaScript, deployed at sky-cart-nu.vercel.app.',
    cover: {
      label: 'Sky Cart',
      caption: 'A modern storefront, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/695077628711ed1d/muztahiddurjoy/sky-cart',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Turn Sky Cart's requirements into a polished storefront shipped on a current stack.",
    problem:
      'Sky Cart needed a reliable storefront that could ship quickly without cutting corners.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at sky-cart-nu.vercel.app.',
    ],
    outcome: 'Live in production at sky-cart-nu.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://sky-cart-nu.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/sky-cart',
      },
    ],
    gallery: [],
  },
  {
    slug: 'intredia-portal',
    name: 'Intredia Portal',
    tagline: 'User, Clients and Projects portal for Intredia LLC',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2023',
    date: '2023-12-12',
    status: 'Shipped',
    featured: false,
    summary: 'User, Clients and Projects portal for Intredia LLC',
    cover: {
      label: 'Intredia Portal',
      caption: 'User, Clients and Projects portal for Intredia LLC',
      url: 'https://opengraph.githubassets.com/b0f4f250a62a3380/Intredia-Inc/Intredia-Portal',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'JavaScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['JavaScript'],
    vision: 'Give Intredia a fast, dependable platform that people genuinely enjoy using.',
    problem:
      'Intredia needed a platform that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with JavaScript.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/Intredia-Portal',
      },
    ],
    gallery: [],
  },
  {
    slug: 'muazuddin-feild-force',
    name: 'Muazuddin Feild Force',
    tagline: 'Frontend and Backend for Muazuddin Steel Feild For Software / App',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Intredia',
    year: '2023',
    date: '2023-12-11',
    status: 'Shipped',
    featured: false,
    summary: 'Frontend and Backend for Muazuddin Steel Feild For Software / App',
    cover: {
      label: 'Muazuddin Feild Force',
      caption: 'Frontend and Backend for Muazuddin Steel Feild For Software / App',
      url: 'https://opengraph.githubassets.com/61e92f7bd3853568/Intredia-Inc/muazuddin-feild-force',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'JavaScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['JavaScript'],
    vision: 'Give Intredia a fast, dependable platform that people genuinely enjoy using.',
    problem:
      'Intredia needed a platform that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with JavaScript.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/muazuddin-feild-force',
      },
    ],
    gallery: [],
  },
  {
    slug: 'techsol',
    name: 'Techsol',
    tagline: "Techsol's web app, engineered end to end.",
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2023',
    date: '2023-11-30',
    status: 'Live',
    featured: false,
    summary:
      'Techsol is a web app built with TypeScript, JavaScript, deployed at techsol-tau.vercel.app.',
    cover: {
      label: 'Techsol',
      caption: "Techsol's web app, engineered end to end.",
      url: 'https://opengraph.githubassets.com/37f4bf15dceeb2654cbc73de95765548f8d497f8502c7e983ff7ba0b4e012fa4/muztahiddurjoy/techsol',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: "Build Techsol a modern web app that's quick to load and easy to maintain.",
    problem: 'Techsol wanted to retire slow, ageing tooling for a maintainable modern stack.',
    build: [
      'Built with TypeScript, JavaScript.',
      'Shipped to production at techsol-tau.vercel.app.',
    ],
    outcome: 'Live in production at techsol-tau.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://techsol-tau.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/techsol',
      },
    ],
    gallery: [],
  },
  {
    slug: 'ahona-web',
    name: 'Ahona Web',
    tagline: 'A modern web app, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Ahona',
    year: '2023',
    date: '2023-11-17',
    status: 'Live',
    featured: false,
    summary:
      'Ahona Web is a web app built with TypeScript, JavaScript for Ahona, deployed at ahona-web.vercel.app.',
    cover: {
      label: 'Ahona Web',
      caption: 'A modern web app, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/6583c03f07d3470a/muztahiddurjoy/ahona-web',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give Ahona a fast, dependable web app that people genuinely enjoy using.',
    problem: 'Ahona needed a web app that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at ahona-web.vercel.app.'],
    outcome: 'Live in production at ahona-web.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://ahona-web.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/ahona-web',
      },
    ],
    gallery: [],
  },
  {
    slug: 'bindulogic-lepton',
    name: 'Bindulogic Lepton',
    tagline: 'Web browser client-side UI for BinduLogic',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'BinduLogic',
    year: '2021',
    date: '2023-11-14',
    status: 'Shipped',
    featured: false,
    summary: 'Web browser client-side UI for BinduLogic',
    cover: {
      label: 'Bindulogic Lepton',
      caption: 'Web browser client-side UI for BinduLogic',
      url: 'https://opengraph.githubassets.com/4fc2dda48ec63eff77fe4c95efc5789c1bb049dff8c3b33442d73ea142fa69a6/BinduLogic/bindulogic-lepton',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give BinduLogic a fast, dependable web app that people genuinely enjoy using.',
    problem:
      'BinduLogic needed a web app that loads fast, looks sharp and is simple to run day to day.',
    build: ['Built with TypeScript, JavaScript.', 'Delivered as part of BinduLogic.'],
    outcome: 'Delivered for BinduLogic.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/BinduLogic/bindulogic-lepton',
      },
    ],
    gallery: [],
  },
  {
    slug: 'comfort-lee-next',
    name: 'Comfort Lee',
    tagline: 'Web App crafted with JavaScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: '',
    year: '2022',
    date: '2023-11-07',
    status: 'Live',
    featured: false,
    summary:
      'Comfort Lee is a web app built with JavaScript, deployed at comfort-lee-next.vercel.app.',
    cover: {
      label: 'Comfort Lee',
      caption: 'Web App crafted with JavaScript.',
      url: 'https://opengraph.githubassets.com/3c04977a28deabc4/muztahiddurjoy/comfort-lee-next',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'JavaScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['JavaScript'],
    vision: 'Deliver Comfort Lee a production-grade web app that scales with the business.',
    problem: 'Comfort Lee required a web app that works on every device and is easy to extend.',
    build: ['Built with JavaScript.', 'Shipped to production at comfort-lee-next.vercel.app.'],
    outcome: 'Live in production at comfort-lee-next.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://comfort-lee-next.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/comfort-lee-next',
      },
    ],
    gallery: [],
  },
  {
    slug: 'ishtikar-web',
    name: 'Ishtikar Web',
    tagline: 'Web App crafted with TypeScript.',
    role: 'Full-stack Developer',
    type: 'product',
    organization: 'Ishtikar',
    year: '2023',
    date: '2023-10-22',
    status: 'Live',
    featured: false,
    summary:
      'Ishtikar Web is a web app built with TypeScript, JavaScript for Ishtikar, deployed at ishtikar.vercel.app.',
    cover: {
      label: 'Ishtikar Web',
      caption: 'Web App crafted with TypeScript.',
      url: 'https://opengraph.githubassets.com/53f7711a7a53ab61/muztahiddurjoy/ishtikar-web',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Deliver Ishtikar a production-grade web app that scales with the business.',
    problem: 'Ishtikar required a web app that works on every device and is easy to extend.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at ishtikar.vercel.app.'],
    outcome: 'Live in production at ishtikar.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://ishtikar.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/ishtikar-web',
      },
    ],
    gallery: [],
  },
  {
    slug: 'argin-web',
    name: 'Argin Web',
    tagline: 'A modern website, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'company',
    organization: 'Argin',
    year: '2023',
    date: '2023-10-19',
    status: 'Live',
    featured: false,
    summary:
      'This is Argin Website Developed By Version Details Version 0.1:. Live at argin-web.vercel.app.',
    cover: {
      label: 'Argin Web',
      caption: 'A modern website, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/12aa0d4d36f4e2a4/muztahiddurjoy/argin-web',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give Argin a credible digital home that reflects the quality of its work.',
    problem: 'Argin needed a professional web presence that loads fast and earns trust.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at argin-web.vercel.app.'],
    outcome: 'Live in production at argin-web.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://argin-web.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/argin-web',
      },
    ],
    gallery: [],
  },
  {
    slug: 'agrigin',
    name: 'Agrigin',
    tagline: 'A modern website, shipped on TypeScript.',
    role: 'Full-stack Developer',
    type: 'company',
    organization: '',
    year: '2023',
    date: '2023-10-11',
    status: 'Live',
    featured: false,
    summary:
      'Agrigin is a website built with TypeScript, JavaScript, deployed at agrigin.vercel.app.',
    cover: {
      label: 'Agrigin',
      caption: 'A modern website, shipped on TypeScript.',
      url: 'https://opengraph.githubassets.com/f3061650809ffaae/muztahiddurjoy/agrigin',
    },
    metrics: [
      {
        label: 'Primary stack',
        value: 'TypeScript',
      },
      {
        label: 'Status',
        value: 'Live',
      },
    ],
    stack: ['TypeScript', 'JavaScript'],
    vision: 'Give Agrigin a credible digital home that reflects the quality of its work.',
    problem: 'Agrigin needed a professional web presence that loads fast and earns trust.',
    build: ['Built with TypeScript, JavaScript.', 'Shipped to production at agrigin.vercel.app.'],
    outcome: 'Live in production at agrigin.vercel.app.',
    links: [
      {
        label: 'Live site',
        url: 'https://agrigin.vercel.app',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/muztahiddurjoy/agrigin',
      },
    ],
    gallery: [],
  },
  {
    slug: 'intredia-com',
    name: 'Intredia',
    tagline: 'Website for Intredia LLC',
    role: 'Full-stack Developer',
    type: 'company',
    organization: '',
    year: '2023',
    date: '2023-10-10',
    status: 'Shipped',
    featured: false,
    summary: 'Intredia is a website built with a modern stack.',
    cover: {
      label: 'Intredia',
      caption: 'Website for Intredia LLC',
      url: 'https://opengraph.githubassets.com/6432804af57d191e/Intredia-Inc/intredia.com',
    },
    metrics: [
      {
        label: 'Status',
        value: 'Open source',
      },
    ],
    stack: [],
    vision: 'Position Intredia online with a fast, modern site that converts visitors.',
    problem: "Intredia's brand needed a site that turns visitors into customers.",
    build: ['Built with a modern stack.', 'Delivered as part of Intredia.'],
    outcome: 'Delivered for Intredia.',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Intredia-Inc/intredia.com',
      },
    ],
    gallery: [],
  },
]
