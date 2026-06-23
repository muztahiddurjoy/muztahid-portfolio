import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Site-wide identity & chrome: drives the nav, footer, transition overlay, 404
 * and SEO defaults. Single source of truth for name / links / metadata.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { description: 'Name, links, navigation, footer, 404 and SEO defaults used across the whole site.' },
  access: {
    read: () => true,
    update: authed,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true, admin: { description: 'Full name, e.g. "Muztahid Rahman".' } },
                { name: 'shortName', type: 'text', required: true, admin: { description: 'First name / wordmark.' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'role', type: 'text', required: true },
                { name: 'location', type: 'text', required: true },
              ],
            },
            { name: 'tagline', type: 'text', required: true },
            { name: 'availability', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', required: true },
                { name: 'github', type: 'text', required: true },
                { name: 'linkedin', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'nav',
              type: 'array',
              label: 'Navigation',
              admin: { description: 'Primary navigation links (nav + footer).' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footer',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'e.g. "Let’s build".' } },
                {
                  type: 'row',
                  fields: [
                    { name: 'heading', type: 'text', admin: { description: 'Big CTA headline.' } },
                    { name: 'headingAccent', type: 'text', admin: { description: 'Italicised word within the heading.' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', admin: { description: 'Primary CTA label, e.g. "Start a conversation".' } },
                    { name: 'ctaHref', type: 'text', admin: { description: 'Primary CTA link, e.g. "/contact".' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'exploreLabel', type: 'text', admin: { description: 'Sitemap column label, e.g. "Explore".' } },
                    { name: 'connectLabel', type: 'text', admin: { description: 'Social column label, e.g. "Connect".' } },
                  ],
                },
                { name: 'copyrightSuffix', type: 'text', admin: { description: 'After "© {year} {name}.", e.g. "Built to last.".' } },
                { name: 'bottomNote', type: 'text', admin: { description: 'Small colophon line, e.g. "Next.js · GSAP · Lenis".' } },
                { name: 'backToTopLabel', type: 'text', admin: { description: 'e.g. "Back to top".' } },
              ],
            },
          ],
        },
        {
          label: '404',
          fields: [
            {
              name: 'notFound',
              type: 'group',
              label: '404 page',
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'Handwritten line, e.g. "lost the thread".' } },
                { name: 'title', type: 'text', admin: { description: 'Big number / title, e.g. "404".' } },
                { name: 'body', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'homeLabel', type: 'text', admin: { description: 'e.g. "Back home".' } },
                    { name: 'projectsLabel', type: 'text', admin: { description: 'e.g. "See the projects".' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO & Media',
          fields: [
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              admin: { description: 'Default SEO / social description.' },
            },
            {
              name: 'siteUrl',
              type: 'text',
              admin: { description: 'Canonical site URL (used for metadataBase / OG). e.g. "https://muztahid.dev".' },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Fallback Open Graph / social share image.' },
            },
            {
              name: 'cvFile',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Academic CV (PDF) served by the download CTA.' },
            },
          ],
        },
      ],
    },
  ],
}
