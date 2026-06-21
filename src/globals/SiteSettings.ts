import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Site-wide identity & chrome: drives the nav, footer, transition overlay and
 * SEO defaults. Single source of truth for name / links / metadata.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { description: 'Name, links, navigation and SEO defaults used across the whole site.' },
  access: {
    read: () => true,
    update: authed,
  },
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
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Default SEO / social description.' },
    },
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
}
