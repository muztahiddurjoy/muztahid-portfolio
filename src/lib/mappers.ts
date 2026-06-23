/* ------------------------------------------------------------------ *
 * Pure, ISOMORPHIC mappers.
 *
 * These transform a raw Payload document (global or collection doc) into
 * the exact UI shape the frontend components consume, falling back to the
 * static content in `portfolio-data` for any missing field. They contain
 * NO server-only imports (`getPayload`, `@payload-config`) so they can run
 * both in RSC (`content.ts`) and in the browser (live-preview wrappers),
 * where `useLivePreview` streams loose, half-typed form state over
 * postMessage. Every read is defensive: unpopulated upload fields arrive
 * as bare ID strings, half-typed arrays may be empty, etc.
 * ------------------------------------------------------------------ */

import {
  siteConfig as S,
  home as H,
  stats as HS,
  story as ST,
  contact as C,
  projectsPage as PP,
  writingPage as WP,
  achievementsPage as AP,
  certificatesPage as CP,
  projectPage as PD,
  sessionsPage as SSP,
  sessionPage as SDP,
  projects as staticProjects,
  sessions as staticSessions,
  articles as staticArticles,
  achievements as staticAchievements,
  certificates as staticCertificates,
  type SiteConfig,
  type HomeData,
  type Stat,
  type Story,
  type ContactData,
  type Project,
  type Session,
  type SessionMode,
  type SessionFormat,
  type SessionLevel,
  type SessionAvailability,
  type Article,
  type Achievement,
  type Certificate,
  type Block as ArticleBlock,
  type ProjectsPageData,
  type WritingPageData,
  type AchievementsPageData,
  type CertificatesPageData,
  type ProjectPageData,
  type SessionsPageData,
  type SessionPageData,
} from './portfolio-data'

type Rec = Record<string, unknown>

export const str = (v: unknown, fallback = ''): string =>
  typeof v === 'string' && v.length ? v : fallback
export const arr = <T>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])
const rec = (v: unknown): Rec => (v && typeof v === 'object' ? (v as Rec) : {})

/** Pull a usable image URL out of a Payload upload field (depth ≥ 1). Returns
 *  undefined for an unpopulated relationship id (a bare string) so the UI
 *  gracefully renders its placeholder while editing. */
export const mediaUrl = (v: unknown): string | undefined => {
  if (typeof v === 'string') return undefined
  const o = rec(v)
  return str(o.url) || undefined
}

export const monthYear = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const cta = (v: unknown, fb: { label: string; href: string }) => {
  const o = rec(v)
  return { label: str(o.label, fb.label), href: str(o.href, fb.href) }
}

/* ----------------------------- site settings ----------------------------- */
export function mapSite(raw: Rec | null | undefined): SiteConfig {
  const g = rec(raw)
  const f = rec(g.footer)
  const nf = rec(g.notFound)
  const nav = arr<{ label?: unknown; href?: unknown }>(g.nav)
    .map((n) => ({ label: str(n.label), href: str(n.href) }))
    .filter((n) => n.label && n.href)
  return {
    name: str(g.name, S.name),
    shortName: str(g.shortName, S.shortName),
    role: str(g.role, S.role),
    tagline: str(g.tagline, S.tagline),
    location: str(g.location, S.location),
    email: str(g.email, S.email),
    github: str(g.github, S.github),
    linkedin: str(g.linkedin, S.linkedin),
    availability: str(g.availability, S.availability),
    metaDescription: str(g.metaDescription, S.metaDescription),
    nav: nav.length ? nav : S.nav,
    ogImage: mediaUrl(g.defaultOgImage) ?? S.ogImage,
    siteUrl: str(g.siteUrl, S.siteUrl),
    footer: {
      eyebrow: str(f.eyebrow, S.footer.eyebrow),
      heading: str(f.heading, S.footer.heading),
      headingAccent: str(f.headingAccent, S.footer.headingAccent),
      ctaLabel: str(f.ctaLabel, S.footer.ctaLabel),
      ctaHref: str(f.ctaHref, S.footer.ctaHref),
      exploreLabel: str(f.exploreLabel, S.footer.exploreLabel),
      connectLabel: str(f.connectLabel, S.footer.connectLabel),
      copyrightSuffix: str(f.copyrightSuffix, S.footer.copyrightSuffix),
      bottomNote: str(f.bottomNote, S.footer.bottomNote),
      backToTopLabel: str(f.backToTopLabel, S.footer.backToTopLabel),
    },
    notFound: {
      eyebrow: str(nf.eyebrow, S.notFound.eyebrow),
      title: str(nf.title, S.notFound.title),
      body: str(nf.body, S.notFound.body),
      homeLabel: str(nf.homeLabel, S.notFound.homeLabel),
      projectsLabel: str(nf.projectsLabel, S.notFound.projectsLabel),
    },
  }
}

/* --------------------------------- home --------------------------------- */
export function mapHome(raw: Rec | null | undefined): HomeData {
  const g = rec(raw)
  const m = rec(g.manifesto)
  const ps = rec(g.projectsSection)
  const ws = rec(g.writingSection)
  const cs = rec(g.certificatesSection)
  const as = rec(g.achievementsSection)
  const headline = arr<{ line?: unknown }>(g.headline).map((h) => str(h.line)).filter(Boolean)
  const marquee = arr<{ text?: unknown }>(g.marquee).map((x) => str(x.text)).filter(Boolean)
  const now = arr<{ label?: unknown; value?: unknown }>(g.now)
    .map((n) => ({ label: str(n.label), value: str(n.value) }))
    .filter((n) => n.label || n.value)
  return {
    eyebrow: str(g.eyebrow, H.eyebrow),
    headline: headline.length ? headline : H.headline,
    headlineAccent: str(g.headlineAccent, H.headlineAccent),
    script: str(g.script, H.script),
    lede: str(g.lede, H.lede),
    primaryCta: cta(g.primaryCta, H.primaryCta),
    secondaryCta: cta(g.secondaryCta, H.secondaryCta),
    marquee: marquee.length ? marquee : H.marquee,
    now: now.length ? now : H.now,
    heroImage: mediaUrl(g.heroPortrait) ?? H.heroImage,
    heroCaption: str(g.heroCaption, H.heroCaption),
    heroBadge: str(g.heroBadge, H.heroBadge),
    statsEyebrow: str(g.statsEyebrow, H.statsEyebrow),
    manifesto: {
      eyebrow: str(m.eyebrow, H.manifesto.eyebrow),
      heading: str(m.heading, H.manifesto.heading),
      headingAccent: str(m.headingAccent, H.manifesto.headingAccent),
      body: str(m.body, H.manifesto.body),
      nowLabel: str(m.nowLabel, H.manifesto.nowLabel),
    },
    projectsSection: {
      eyebrow: str(ps.eyebrow, H.projectsSection.eyebrow),
      headingLineOne: str(ps.headingLineOne, H.projectsSection.headingLineOne),
      headingLineTwo: str(ps.headingLineTwo, H.projectsSection.headingLineTwo),
      description: str(ps.description, H.projectsSection.description),
      ctaLabel: str(ps.ctaLabel, H.projectsSection.ctaLabel),
      ctaHref: str(ps.ctaHref, H.projectsSection.ctaHref),
    },
    writingSection: {
      eyebrow: str(ws.eyebrow, H.writingSection.eyebrow),
      heading: str(ws.heading, H.writingSection.heading),
      ctaLabel: str(ws.ctaLabel, H.writingSection.ctaLabel),
      ctaHref: str(ws.ctaHref, H.writingSection.ctaHref),
      itemCtaLabel: str(ws.itemCtaLabel, H.writingSection.itemCtaLabel),
    },
    certificatesSection: {
      eyebrow: str(cs.eyebrow, H.certificatesSection.eyebrow),
      headingLineOne: str(cs.headingLineOne, H.certificatesSection.headingLineOne),
      headingLineTwo: str(cs.headingLineTwo, H.certificatesSection.headingLineTwo),
      ctaLabel: str(cs.ctaLabel, H.certificatesSection.ctaLabel),
      ctaHref: str(cs.ctaHref, H.certificatesSection.ctaHref),
    },
    achievementsSection: {
      eyebrow: str(as.eyebrow, H.achievementsSection.eyebrow),
      headingLineOne: str(as.headingLineOne, H.achievementsSection.headingLineOne),
      headingLineTwo: str(as.headingLineTwo, H.achievementsSection.headingLineTwo),
      ctaLabel: str(as.ctaLabel, H.achievementsSection.ctaLabel),
      ctaHref: str(as.ctaHref, H.achievementsSection.ctaHref),
    },
  }
}

export function mapStats(raw: Rec | null | undefined): Stat[] {
  const g = rec(raw)
  const s = arr<{ value?: unknown; suffix?: unknown; label?: unknown }>(g.stats).map((x) => ({
    value: typeof x.value === 'number' ? x.value : 0,
    suffix: str(x.suffix),
    label: str(x.label),
  }))
  return s.length ? s : (HS as Stat[])
}

/* --------------------------------- about -------------------------------- */
export function mapAbout(raw: Rec | null | undefined): Story {
  const g = rec(raw)
  const portrait = rec(g.portrait)
  const philosophy = rec(g.philosophy)
  const portraitImage = mediaUrl(portrait.image)
  const headlineLines = arr<{ line?: unknown }>(g.headlineLines).map((h) => str(h.line)).filter(Boolean)
  const narrative = arr<{ text?: unknown }>(g.narrative).map((n) => str(n.text)).filter(Boolean)
  const values = arr<{ title?: unknown; body?: unknown }>(g.values)
    .map((v) => ({ title: str(v.title), body: str(v.body) }))
    .filter((v) => v.title || v.body)
  const journey = arr<{ year?: unknown; title?: unknown; detail?: unknown }>(g.journey)
    .map((j) => ({ year: str(j.year), title: str(j.title), detail: str(j.detail) }))
    .filter((j) => j.year || j.title || j.detail)
  return {
    eyebrow: str(g.eyebrow, ST.eyebrow),
    title: str(g.title, ST.title),
    intro: str(g.intro, ST.intro),
    portrait: {
      label: str(portrait.label, ST.portrait.label),
      caption: str(portrait.caption, ST.portrait.caption),
      image: portraitImage ?? ST.portrait.image,
    },
    headlineLines: headlineLines.length ? headlineLines : ST.headlineLines,
    headlineAccent: str(g.headlineAccent, ST.headlineAccent),
    signature: str(g.signature, ST.signature),
    narrativeSignature: str(g.narrativeSignature, ST.narrativeSignature),
    philosophyEyebrow: str(g.philosophyEyebrow, ST.philosophyEyebrow),
    valuesEyebrow: str(g.valuesEyebrow, ST.valuesEyebrow),
    valuesIntro: str(g.valuesIntro, ST.valuesIntro),
    journeyEyebrow: str(g.journeyEyebrow, ST.journeyEyebrow),
    journeyIntro: str(g.journeyIntro, ST.journeyIntro),
    nextEyebrow: str(g.nextEyebrow, ST.nextEyebrow),
    primaryCta: cta(g.primaryCta, ST.primaryCta),
    secondaryCta: cta(g.secondaryCta, ST.secondaryCta),
    metaTitle: str(g.metaTitle, ST.metaTitle),
    metaDescription: str(g.metaDescription, ST.metaDescription),
    narrative: narrative.length ? narrative : ST.narrative,
    philosophy: {
      quote: str(philosophy.quote, ST.philosophy.quote),
      body: str(philosophy.body, ST.philosophy.body),
    },
    values: values.length ? values : ST.values,
    journey: journey.length ? journey : ST.journey,
    next: str(g.next, ST.next),
  }
}

/* -------------------------------- contact ------------------------------- */
export function mapContact(raw: Rec | null | undefined): ContactData {
  const g = rec(raw)
  const inv = rec(g.invitation)
  const form = rec(g.form)
  const success = rec(g.success)
  const errors = rec(g.errorMessages)
  const channels = arr<{ label?: unknown; value?: unknown; href?: unknown; icon?: unknown }>(g.channels)
    .map((c) => ({ label: str(c.label), value: str(c.value), href: str(c.href), icon: str(c.icon, 'none') }))
    .filter((c) => c.label || c.value)
  return {
    eyebrow: str(g.eyebrow, C.eyebrow),
    title: str(g.title, C.title),
    titleAccent: str(g.titleAccent, C.titleAccent),
    blurb: str(g.blurb, C.blurb),
    replyTime: str(g.replyTime, C.replyTime),
    invitation: {
      eyebrow: str(inv.eyebrow, C.invitation.eyebrow),
      script: str(inv.script, C.invitation.script),
      body: str(inv.body, C.invitation.body),
    },
    form: {
      eyebrow: str(form.eyebrow, C.form.eyebrow),
      nameLabel: str(form.nameLabel, C.form.nameLabel),
      emailLabel: str(form.emailLabel, C.form.emailLabel),
      messageLabel: str(form.messageLabel, C.form.messageLabel),
      namePlaceholder: str(form.namePlaceholder, C.form.namePlaceholder),
      emailPlaceholder: str(form.emailPlaceholder, C.form.emailPlaceholder),
      messagePlaceholder: str(form.messagePlaceholder, C.form.messagePlaceholder),
      submitLabel: str(form.submitLabel, C.form.submitLabel),
      sendingLabel: str(form.sendingLabel, C.form.sendingLabel),
      footnote: str(form.footnote, C.form.footnote),
    },
    success: {
      script: str(success.script, C.success.script),
      heading: str(success.heading, C.success.heading),
      headingAccent: str(success.headingAccent, C.success.headingAccent),
      body: str(success.body, C.success.body),
      ctaLabel: str(success.ctaLabel, C.success.ctaLabel),
    },
    errors: {
      nameRequired: str(errors.nameRequired, C.errors.nameRequired),
      emailRequired: str(errors.emailRequired, C.errors.emailRequired),
      emailInvalid: str(errors.emailInvalid, C.errors.emailInvalid),
      messageRequired: str(errors.messageRequired, C.errors.messageRequired),
      submitFailed: str(errors.submitFailed, C.errors.submitFailed),
    },
    metaTitle: str(g.metaTitle, C.metaTitle),
    metaDescription: str(g.metaDescription, C.metaDescription),
    channels: channels.length ? channels : C.channels,
  }
}

/* ------------------------------- projects ------------------------------- */
export function mapProject(raw: Rec | null | undefined): Project {
  const d = rec(raw)
  const cover = rec(d.cover)
  const slug = str(d.slug)
  // Fall back to the curated static imagery for this slug when the CMS doc has no
  // upload, so covers/gallery render whether we read Payload or static content.
  const fb = staticProjects.find((p) => p.slug === slug)
  const coverImage = mediaUrl(cover.image) ?? fb?.cover.image
  // External cover URL (e.g. a GitHub OG card) — used when there's no upload.
  const coverUrl = str(cover.url) || fb?.cover.url
  const organization = str(d.organization) || fb?.organization
  return {
    slug,
    name: str(d.name),
    tagline: str(d.tagline),
    role: str(d.role),
    type: str(d.type, 'product') as Project['type'],
    ...(organization ? { organization } : {}),
    year: str(d.year),
    ...(str(d.date) ? { date: str(d.date) } : {}),
    status: str(d.status),
    featured: Boolean(d.featured),
    summary: str(d.summary),
    cover: {
      label: str(cover.label),
      caption: str(cover.caption),
      ...(coverImage ? { image: coverImage } : {}),
      ...(coverUrl ? { url: coverUrl } : {}),
    },
    metrics: arr<{ label?: unknown; value?: unknown; proof?: unknown }>(d.metrics).map((m) => ({
      label: str(m.label),
      value: str(m.value),
      proof: Boolean(m.proof),
    })),
    stack: arr<string>(d.stack).filter((s) => typeof s === 'string'),
    vision: str(d.vision),
    problem: str(d.problem),
    build: arr<{ point?: unknown }>(d.build).map((b) => str(b.point)),
    outcome: str(d.outcome),
    links: arr<{ label?: unknown; url?: unknown }>(d.links).map((l) => ({ label: str(l.label), url: str(l.url) })),
    gallery: arr<{ label?: unknown; caption?: unknown; image?: unknown; url?: unknown }>(d.gallery).map((gx, i) => {
      const img = mediaUrl(gx.image) ?? fb?.gallery[i]?.image
      const gurl = str(gx.url) || fb?.gallery[i]?.url
      return {
        label: str(gx.label),
        caption: str(gx.caption),
        ...(img ? { image: img } : {}),
        ...(gurl ? { url: gurl } : {}),
      }
    }),
  }
}

/* ------------------------------- sessions ------------------------------- */
export function mapSession(raw: Rec | null | undefined): Session {
  const d = rec(raw)
  const cover = rec(d.cover)
  const log = rec(d.logistics)
  const book = rec(d.booking)
  const slug = str(d.slug)
  // Fall back to the curated static cover for this slug when the CMS doc has no
  // upload, so the imagery renders whether we read Payload or static content.
  const fb = staticSessions.find((s) => s.slug === slug)
  const coverImage = mediaUrl(cover.image) ?? fb?.cover.image
  return {
    slug,
    title: str(d.title),
    tagline: str(d.tagline),
    mode: str(d.mode, 'online') as SessionMode,
    format: str(d.format, 'mentoring') as SessionFormat,
    level: str(d.level, 'all') as SessionLevel,
    ...(str(d.date) ? { date: str(d.date) } : {}),
    featured: Boolean(d.featured),
    availability: str(d.availability, 'open') as SessionAvailability,
    summary: str(d.summary),
    cover: { label: str(cover.label), caption: str(cover.caption), ...(coverImage ? { image: coverImage } : {}) },
    logistics: {
      duration: str(log.duration),
      price: str(log.price),
      capacity: str(log.capacity),
      location: str(log.location),
      languages: arr<string>(log.languages).filter((l) => typeof l === 'string'),
      deliveryNote: str(log.deliveryNote),
    },
    topics: arr<string>(d.topics).filter((t) => typeof t === 'string'),
    audience: str(d.audience),
    highlights: arr<{ point?: unknown }>(d.highlights).map((h) => str(h.point)).filter(Boolean),
    agenda: arr<{ title?: unknown; detail?: unknown }>(d.agenda)
      .map((a) => ({ title: str(a.title), detail: str(a.detail) }))
      .filter((a) => a.title || a.detail),
    prerequisites: arr<{ item?: unknown }>(d.prerequisites).map((p) => str(p.item)).filter(Boolean),
    faqs: arr<{ question?: unknown; answer?: unknown }>(d.faqs)
      .map((f) => ({ question: str(f.question), answer: str(f.answer) }))
      .filter((f) => f.question || f.answer),
    testimonials: arr<{ quote?: unknown; author?: unknown; role?: unknown }>(d.testimonials)
      .map((t) => ({ quote: str(t.quote), author: str(t.author), role: str(t.role) }))
      .filter((t) => t.quote),
    booking: {
      type: (str(book.type, 'form') as Session['booking']['type']),
      url: str(book.url),
      email: str(book.email),
      note: str(book.note),
    },
    links: arr<{ label?: unknown; url?: unknown }>(d.links)
      .map((l) => ({ label: str(l.label), url: str(l.url) }))
      .filter((l) => l.label && l.url),
  }
}

/* ------------------------------- articles ------------------------------- */
export function mapArticle(raw: Rec | null | undefined): Article {
  const d = rec(raw)
  const cover = rec(d.cover)
  const fb = staticArticles.find((a) => a.slug === str(d.slug))
  const coverImage = mediaUrl(cover.image) ?? fb?.cover.image
  const date = str(d.date)
  const body: ArticleBlock[] = arr<Rec>(d.body)
    .map((b): ArticleBlock | null => {
      const text = str(b.text)
      switch (str(b.blockType)) {
        case 'heading':
          return { type: 'h', text }
        case 'quote':
          return { type: 'quote', text }
        case 'paragraph':
          return { type: 'p', text }
        case 'image': {
          const caption = str(b.caption)
          return { type: 'img', src: mediaUrl(b.image) ?? '', ...(caption ? { caption } : {}) }
        }
        default:
          return null
      }
    })
    .filter((b): b is ArticleBlock => b !== null)
  return {
    slug: str(d.slug),
    title: str(d.title),
    excerpt: str(d.excerpt),
    date,
    dateLabel: str(d.dateLabel) || monthYear(date),
    readTime: str(d.readTime),
    category: str(d.category, 'building') as Article['category'],
    tags: arr<string>(d.tags).filter((t) => typeof t === 'string'),
    featured: Boolean(d.featured),
    cover: { label: str(cover.label), caption: str(cover.caption), ...(coverImage ? { image: coverImage } : {}) },
    body,
  }
}

/* ----------------------------- achievements ----------------------------- */
export function mapAchievement(raw: Rec | null | undefined): Achievement {
  const d = rec(raw)
  return {
    id: str(d.id),
    title: str(d.title),
    organization: str(d.organization),
    date: str(d.date),
    dateLabel: str(d.dateLabel),
    type: str(d.type, 'milestone') as Achievement['type'],
    description: str(d.description),
    featured: Boolean(d.featured),
    ...(str(d.link) ? { link: str(d.link) } : {}),
  }
}

/* ----------------------------- certificates ----------------------------- */
export function mapCertificate(raw: Rec | null | undefined): Certificate {
  const d = rec(raw)
  return {
    id: str(d.key) || str(d.id),
    title: str(d.title),
    issuer: str(d.issuer),
    date: str(d.date),
    dateLabel: str(d.dateLabel),
    credentialId: str(d.credentialId),
    skills: arr<string>(d.skills).filter((s) => typeof s === 'string'),
    ...(str(d.discipline) ? { discipline: str(d.discipline) } : {}),
    featured: Boolean(d.featured),
  }
}

/* --------------------------- list/detail pages -------------------------- */
export function mapProjectsPage(raw: Rec | null | undefined): ProjectsPageData {
  const g = rec(raw)
  return {
    eyebrow: str(g.eyebrow, PP.eyebrow),
    headlineLineOne: str(g.headlineLineOne, PP.headlineLineOne),
    headlineLineTwo: str(g.headlineLineTwo, PP.headlineLineTwo),
    intro: str(g.intro, PP.intro),
    countNoun: str(g.countNoun, PP.countNoun),
    viewLabel: str(g.viewLabel, PP.viewLabel),
    curatedLabel: str(g.curatedLabel, PP.curatedLabel),
    recentLabel: str(g.recentLabel, PP.recentLabel),
    featuredLabel: str(g.featuredLabel, PP.featuredLabel),
    allLabel: str(g.allLabel, PP.allLabel),
    ofLabel: str(g.ofLabel, PP.ofLabel),
    featuredBadge: str(g.featuredBadge, PP.featuredBadge),
    rowCtaLabel: str(g.rowCtaLabel, PP.rowCtaLabel),
    emptyScript: str(g.emptyScript, PP.emptyScript),
    emptyMessageFeatured: str(g.emptyMessageFeatured, PP.emptyMessageFeatured),
    emptyMessageDefault: str(g.emptyMessageDefault, PP.emptyMessageDefault),
    emptyCtaLabel: str(g.emptyCtaLabel, PP.emptyCtaLabel),
    metaTitle: str(g.metaTitle, PP.metaTitle),
    metaDescription: str(g.metaDescription, PP.metaDescription),
  }
}

export function mapWritingPage(raw: Rec | null | undefined): WritingPageData {
  const g = rec(raw)
  return {
    eyebrow: str(g.eyebrow, WP.eyebrow),
    headlineLineOne: str(g.headlineLineOne, WP.headlineLineOne),
    headlineLineTwo: str(g.headlineLineTwo, WP.headlineLineTwo),
    lede: str(g.lede, WP.lede),
    ledeHighlight: str(g.ledeHighlight, WP.ledeHighlight),
    signature: str(g.signature, WP.signature),
    descriptor: str(g.descriptor, WP.descriptor),
    featuredEyebrow: str(g.featuredEyebrow, WP.featuredEyebrow),
    featuredCtaLabel: str(g.featuredCtaLabel, WP.featuredCtaLabel),
    archiveEyebrow: str(g.archiveEyebrow, WP.archiveEyebrow),
    archiveHeading: str(g.archiveHeading, WP.archiveHeading),
    archiveHeadingAccent: str(g.archiveHeadingAccent, WP.archiveHeadingAccent),
    allLabel: str(g.allLabel, WP.allLabel),
    metaTitle: str(g.metaTitle, WP.metaTitle),
    metaDescription: str(g.metaDescription, WP.metaDescription),
  }
}

export function mapAchievementsPage(raw: Rec | null | undefined): AchievementsPageData {
  const g = rec(raw)
  const statLabels = arr<{ label?: unknown }>(g.statLabels).map((x) => str(x.label)).filter(Boolean)
  return {
    eyebrow: str(g.eyebrow, AP.eyebrow),
    headingLineOne: str(g.headingLineOne, AP.headingLineOne),
    headingLineTwo: str(g.headingLineTwo, AP.headingLineTwo),
    lede: str(g.lede, AP.lede),
    signature: str(g.signature, AP.signature),
    statLabels: statLabels.length ? statLabels : AP.statLabels,
    highlightsEyebrow: str(g.highlightsEyebrow, AP.highlightsEyebrow),
    highlightsHeading: str(g.highlightsHeading, AP.highlightsHeading),
    highlightsHeadingAccent: str(g.highlightsHeadingAccent, AP.highlightsHeadingAccent),
    highlightsBlurb: str(g.highlightsBlurb, AP.highlightsBlurb),
    leadScript: str(g.leadScript, AP.leadScript),
    recordEyebrow: str(g.recordEyebrow, AP.recordEyebrow),
    recordHeading: str(g.recordHeading, AP.recordHeading),
    recordHeadingAccent: str(g.recordHeadingAccent, AP.recordHeadingAccent),
    linkLabel: str(g.linkLabel, AP.linkLabel),
    closingText: str(g.closingText, AP.closingText),
    closingTextAccent: str(g.closingTextAccent, AP.closingTextAccent),
    primaryCta: cta(g.primaryCta, AP.primaryCta),
    secondaryCta: cta(g.secondaryCta, AP.secondaryCta),
    metaTitle: str(g.metaTitle, AP.metaTitle),
    metaDescription: str(g.metaDescription, AP.metaDescription),
  }
}

export function mapCertificatesPage(raw: Rec | null | undefined): CertificatesPageData {
  const g = rec(raw)
  const disciplines = arr<{ label?: unknown }>(g.disciplines).map((x) => str(x.label)).filter(Boolean)
  return {
    eyebrow: str(g.eyebrow, CP.eyebrow),
    headlinePrefix: str(g.headlinePrefix, CP.headlinePrefix),
    headlineAccent: str(g.headlineAccent, CP.headlineAccent),
    headlineSuffix: str(g.headlineSuffix, CP.headlineSuffix),
    lede: str(g.lede, CP.lede),
    ledeHighlight: str(g.ledeHighlight, CP.ledeHighlight),
    signature: str(g.signature, CP.signature),
    filterEyebrow: str(g.filterEyebrow, CP.filterEyebrow),
    filterDescription: str(g.filterDescription, CP.filterDescription),
    allLabel: str(g.allLabel, CP.allLabel),
    disciplines: disciplines.length ? disciplines : CP.disciplines,
    closingEyebrow: str(g.closingEyebrow, CP.closingEyebrow),
    closingHeadingPrefix: str(g.closingHeadingPrefix, CP.closingHeadingPrefix),
    closingHeadingAccent: str(g.closingHeadingAccent, CP.closingHeadingAccent),
    closingHeadingSuffix: str(g.closingHeadingSuffix, CP.closingHeadingSuffix),
    closingBody: str(g.closingBody, CP.closingBody),
    closingCtaLabel: str(g.closingCtaLabel, CP.closingCtaLabel),
    closingCtaHref: str(g.closingCtaHref, CP.closingCtaHref),
    metaTitle: str(g.metaTitle, CP.metaTitle),
    metaDescription: str(g.metaDescription, CP.metaDescription),
  }
}

export function mapProjectPage(raw: Rec | null | undefined): ProjectPageData {
  const g = rec(raw)
  const cse = rec(g.caseStudy)
  const pager = rec(g.pager)
  return {
    caseStudy: {
      visionLabel: str(cse.visionLabel, PD.caseStudy.visionLabel),
      problemLabel: str(cse.problemLabel, PD.caseStudy.problemLabel),
      buildLabel: str(cse.buildLabel, PD.caseStudy.buildLabel),
      outcomeLabel: str(cse.outcomeLabel, PD.caseStudy.outcomeLabel),
      galleryLabel: str(cse.galleryLabel, PD.caseStudy.galleryLabel),
      builtWithLabel: str(cse.builtWithLabel, PD.caseStudy.builtWithLabel),
      proofLabel: str(cse.proofLabel, PD.caseStudy.proofLabel),
    },
    pager: {
      prevLabel: str(pager.prevLabel, PD.pager.prevLabel),
      nextLabel: str(pager.nextLabel, PD.pager.nextLabel),
      latestLabel: str(pager.latestLabel, PD.pager.latestLabel),
      startLabel: str(pager.startLabel, PD.pager.startLabel),
      allProjectsLabel: str(pager.allProjectsLabel, PD.pager.allProjectsLabel),
      allProjectsScript: str(pager.allProjectsScript, PD.pager.allProjectsScript),
      backLinkLabel: str(pager.backLinkLabel, PD.pager.backLinkLabel),
    },
  }
}

export function mapSessionsPage(raw: Rec | null | undefined): SessionsPageData {
  const g = rec(raw)
  return {
    eyebrow: str(g.eyebrow, SSP.eyebrow),
    headlineLineOne: str(g.headlineLineOne, SSP.headlineLineOne),
    headlineLineTwo: str(g.headlineLineTwo, SSP.headlineLineTwo),
    intro: str(g.intro, SSP.intro),
    countNoun: str(g.countNoun, SSP.countNoun),
    viewLabel: str(g.viewLabel, SSP.viewLabel),
    curatedLabel: str(g.curatedLabel, SSP.curatedLabel),
    recentLabel: str(g.recentLabel, SSP.recentLabel),
    featuredLabel: str(g.featuredLabel, SSP.featuredLabel),
    modeLabel: str(g.modeLabel, SSP.modeLabel),
    allLabel: str(g.allLabel, SSP.allLabel),
    ofLabel: str(g.ofLabel, SSP.ofLabel),
    featuredBadge: str(g.featuredBadge, SSP.featuredBadge),
    rowCtaLabel: str(g.rowCtaLabel, SSP.rowCtaLabel),
    emptyScript: str(g.emptyScript, SSP.emptyScript),
    emptyMessageFeatured: str(g.emptyMessageFeatured, SSP.emptyMessageFeatured),
    emptyMessageDefault: str(g.emptyMessageDefault, SSP.emptyMessageDefault),
    emptyCtaLabel: str(g.emptyCtaLabel, SSP.emptyCtaLabel),
    metaTitle: str(g.metaTitle, SSP.metaTitle),
    metaDescription: str(g.metaDescription, SSP.metaDescription),
  }
}

export function mapSessionPage(raw: Rec | null | undefined): SessionPageData {
  const g = rec(raw)
  const det = rec(g.detail)
  const bk = rec(g.booking)
  const suc = rec(bk.success)
  // CMS field is `errorMessages` (`errors` is a reserved Mongoose pathname);
  // the UI shape keeps the `errors` key.
  const err = rec(bk.errorMessages)
  const pager = rec(g.pager)
  const D = SDP.detail
  const B = SDP.booking
  const P = SDP.pager
  return {
    detail: {
      logisticsLabel: str(det.logisticsLabel, D.logisticsLabel),
      durationLabel: str(det.durationLabel, D.durationLabel),
      priceLabel: str(det.priceLabel, D.priceLabel),
      capacityLabel: str(det.capacityLabel, D.capacityLabel),
      locationLabel: str(det.locationLabel, D.locationLabel),
      modeLabel: str(det.modeLabel, D.modeLabel),
      languagesLabel: str(det.languagesLabel, D.languagesLabel),
      availabilityLabel: str(det.availabilityLabel, D.availabilityLabel),
      topicsLabel: str(det.topicsLabel, D.topicsLabel),
      audienceLabel: str(det.audienceLabel, D.audienceLabel),
      highlightsLabel: str(det.highlightsLabel, D.highlightsLabel),
      agendaLabel: str(det.agendaLabel, D.agendaLabel),
      prerequisitesLabel: str(det.prerequisitesLabel, D.prerequisitesLabel),
      faqLabel: str(det.faqLabel, D.faqLabel),
      testimonialsLabel: str(det.testimonialsLabel, D.testimonialsLabel),
    },
    booking: {
      eyebrow: str(bk.eyebrow, B.eyebrow),
      heading: str(bk.heading, B.heading),
      headingAccent: str(bk.headingAccent, B.headingAccent),
      body: str(bk.body, B.body),
      openLabel: str(bk.openLabel, B.openLabel),
      waitlistLabel: str(bk.waitlistLabel, B.waitlistLabel),
      closedLabel: str(bk.closedLabel, B.closedLabel),
      externalLabel: str(bk.externalLabel, B.externalLabel),
      orFormLabel: str(bk.orFormLabel, B.orFormLabel),
      nameLabel: str(bk.nameLabel, B.nameLabel),
      emailLabel: str(bk.emailLabel, B.emailLabel),
      goalLabel: str(bk.goalLabel, B.goalLabel),
      namePlaceholder: str(bk.namePlaceholder, B.namePlaceholder),
      emailPlaceholder: str(bk.emailPlaceholder, B.emailPlaceholder),
      goalPlaceholder: str(bk.goalPlaceholder, B.goalPlaceholder),
      preferredModeLabel: str(bk.preferredModeLabel, B.preferredModeLabel),
      preferredDateLabel: str(bk.preferredDateLabel, B.preferredDateLabel),
      preferredDateHint: str(bk.preferredDateHint, B.preferredDateHint),
      submitLabel: str(bk.submitLabel, B.submitLabel),
      sendingLabel: str(bk.sendingLabel, B.sendingLabel),
      footnote: str(bk.footnote, B.footnote),
      success: {
        script: str(suc.script, B.success.script),
        heading: str(suc.heading, B.success.heading),
        headingAccent: str(suc.headingAccent, B.success.headingAccent),
        body: str(suc.body, B.success.body),
        ctaLabel: str(suc.ctaLabel, B.success.ctaLabel),
      },
      errors: {
        nameRequired: str(err.nameRequired, B.errors.nameRequired),
        emailRequired: str(err.emailRequired, B.errors.emailRequired),
        emailInvalid: str(err.emailInvalid, B.errors.emailInvalid),
        goalRequired: str(err.goalRequired, B.errors.goalRequired),
        submitFailed: str(err.submitFailed, B.errors.submitFailed),
      },
    },
    pager: {
      prevLabel: str(pager.prevLabel, P.prevLabel),
      nextLabel: str(pager.nextLabel, P.nextLabel),
      latestLabel: str(pager.latestLabel, P.latestLabel),
      startLabel: str(pager.startLabel, P.startLabel),
      allLabel: str(pager.allLabel, P.allLabel),
      allScript: str(pager.allScript, P.allScript),
      backLinkLabel: str(pager.backLinkLabel, P.backLinkLabel),
    },
  }
}
