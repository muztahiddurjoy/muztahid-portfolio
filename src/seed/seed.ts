/**
 * Seed the Payload backend with the portfolio's current content.
 *
 *   npm run seed
 *
 * Idempotent: globals are upserted, collections are reset (wiped) and
 * recreated, so re-running always converges to the same state. Reads
 * DATABASE_URL / PAYLOAD_SECRET from .env. Requires a reachable database.
 *
 * Note: this does NOT create an admin user — create the first admin via the
 * /admin first-run screen (or `npm run payload -- create-first-user`).
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

import {
  siteConfig,
  home,
  stats,
  story,
  contact,
  projects,
  articles,
  achievements,
  certificates,
  projectsPage,
  writingPage,
  achievementsPage,
  certificatesPage,
  projectPage,
} from '../lib/portfolio-data'

type AnyCollection =
  | 'projects'
  | 'articles'
  | 'achievements'
  | 'certificates'
  | 'contact-submissions'

const run = async () => {
  const payload = await getPayload({ config })
  payload.logger.info('🌱 Seeding portfolio content…')

  /* ----------------------------- globals ----------------------------- */
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      role: siteConfig.role,
      tagline: siteConfig.tagline,
      location: siteConfig.location,
      email: siteConfig.email,
      github: siteConfig.github,
      linkedin: siteConfig.linkedin,
      availability: siteConfig.availability,
      metaDescription: siteConfig.metaDescription,
      siteUrl: siteConfig.siteUrl,
      nav: siteConfig.nav.map((n) => ({ label: n.label, href: n.href })),
      footer: { ...siteConfig.footer },
      notFound: { ...siteConfig.notFound },
    },
  })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      eyebrow: home.eyebrow,
      headline: home.headline.map((line) => ({ line })),
      headlineAccent: home.headlineAccent,
      script: home.script,
      lede: home.lede,
      heroCaption: home.heroCaption,
      heroBadge: home.heroBadge,
      primaryCta: { label: home.primaryCta.label, href: home.primaryCta.href },
      secondaryCta: { label: home.secondaryCta.label, href: home.secondaryCta.href },
      marquee: home.marquee.map((text) => ({ text })),
      now: home.now.map((n) => ({ label: n.label, value: n.value })),
      manifesto: { ...home.manifesto },
      projectsSection: { ...home.projectsSection },
      writingSection: { ...home.writingSection },
      certificatesSection: { ...home.certificatesSection },
      achievementsSection: { ...home.achievementsSection },
      statsEyebrow: home.statsEyebrow,
      stats: stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label })),
    },
  })

  await payload.updateGlobal({
    slug: 'about',
    data: {
      eyebrow: story.eyebrow,
      title: story.title,
      intro: story.intro,
      headlineLines: story.headlineLines.map((line) => ({ line })),
      headlineAccent: story.headlineAccent,
      signature: story.signature,
      narrativeSignature: story.narrativeSignature,
      portrait: { label: story.portrait.label, caption: story.portrait.caption },
      narrative: story.narrative.map((text) => ({ text })),
      philosophyEyebrow: story.philosophyEyebrow,
      philosophy: { quote: story.philosophy.quote, body: story.philosophy.body },
      valuesEyebrow: story.valuesEyebrow,
      valuesIntro: story.valuesIntro,
      values: story.values.map((v) => ({ title: v.title, body: v.body })),
      journeyEyebrow: story.journeyEyebrow,
      journeyIntro: story.journeyIntro,
      journey: story.journey.map((j) => ({ year: j.year, title: j.title, detail: j.detail })),
      nextEyebrow: story.nextEyebrow,
      next: story.next,
      primaryCta: { ...story.primaryCta },
      secondaryCta: { ...story.secondaryCta },
      metaTitle: story.metaTitle,
      metaDescription: story.metaDescription,
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      eyebrow: contact.eyebrow,
      title: contact.title,
      titleAccent: contact.titleAccent,
      blurb: contact.blurb,
      replyTime: contact.replyTime,
      invitation: { ...contact.invitation },
      form: { ...contact.form },
      success: { ...contact.success },
      errorMessages: { ...contact.errors },
      metaTitle: contact.metaTitle,
      metaDescription: contact.metaDescription,
      channels: contact.channels.map((c) => ({ label: c.label, value: c.value, href: c.href, icon: c.icon })),
    },
  })

  await payload.updateGlobal({
    slug: 'projects-page',
    data: { ...projectsPage },
  })

  await payload.updateGlobal({
    slug: 'writing-page',
    data: { ...writingPage },
  })

  await payload.updateGlobal({
    slug: 'achievements-page',
    data: {
      ...achievementsPage,
      statLabels: achievementsPage.statLabels.map((label) => ({ label })),
      primaryCta: { ...achievementsPage.primaryCta },
      secondaryCta: { ...achievementsPage.secondaryCta },
    },
  })

  await payload.updateGlobal({
    slug: 'certificates-page',
    data: {
      ...certificatesPage,
      disciplines: certificatesPage.disciplines.map((label) => ({ label })),
    },
  })

  await payload.updateGlobal({
    slug: 'project-page',
    data: {
      caseStudy: { ...projectPage.caseStudy },
      pager: { ...projectPage.pager },
    },
  })

  /* --------------------------- collections --------------------------- */
  const reset = async (collection: AnyCollection) => {
    const existing = await payload.find({ collection, limit: 1000, depth: 0 })
    for (const doc of existing.docs) {
      await payload.delete({ collection, id: doc.id })
    }
  }

  await reset('projects')
  for (const v of projects) {
    await payload.create({
      collection: 'projects',
      data: {
        name: v.name,
        slug: v.slug,
        tagline: v.tagline,
        role: v.role,
        type: v.type,
        year: v.year,
        ...(v.date ? { date: v.date } : {}),
        status: v.status,
        featured: v.featured,
        summary: v.summary,
        cover: { label: v.cover.label, caption: v.cover.caption },
        stack: v.stack,
        metrics: v.metrics.map((m) => ({ label: m.label, value: m.value })),
        vision: v.vision,
        problem: v.problem,
        build: v.build.map((point) => ({ point })),
        outcome: v.outcome,
        links: v.links.map((l) => ({ label: l.label, url: l.url })),
        gallery: v.gallery.map((g) => ({ label: g.label, caption: g.caption })),
        _status: 'published',
      },
    })
  }

  await reset('articles')
  for (const a of articles) {
    await payload.create({
      collection: 'articles',
      data: {
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        category: a.category,
        readTime: a.readTime,
        date: a.date,
        dateLabel: a.dateLabel,
        tags: a.tags,
        featured: a.featured,
        cover: { label: a.cover.label, caption: a.cover.caption },
        body: a.body.map((b) => ({
          blockType: b.type === 'p' ? 'paragraph' : b.type === 'h' ? 'heading' : 'quote',
          text: b.text,
        })),
        _status: 'published',
      },
    })
  }

  await reset('achievements')
  for (const ac of achievements) {
    await payload.create({
      collection: 'achievements',
      data: {
        title: ac.title,
        organization: ac.organization,
        date: ac.date,
        dateLabel: ac.dateLabel,
        type: ac.type,
        description: ac.description,
        featured: ac.featured,
        link: ac.link,
      },
    })
  }

  await reset('certificates')
  for (const c of certificates) {
    await payload.create({
      collection: 'certificates',
      data: {
        title: c.title,
        issuer: c.issuer,
        date: c.date,
        dateLabel: c.dateLabel,
        credentialId: c.credentialId,
        skills: c.skills,
        discipline: c.discipline,
        featured: Boolean(c.featured),
        key: c.id,
      },
    })
  }

  payload.logger.info(
    `✅ Seed complete — ${projects.length} projects, ${articles.length} articles, ${achievements.length} achievements, ${certificates.length} certificates.`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
