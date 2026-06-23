import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Chrome / copy + discipline filter for the Certificates page (entries live in the Certificates collection). */
export const CertificatesPage: GlobalConfig = {
  slug: 'certificates-page',
  label: 'Certificates Page',
  admin: { description: 'Hero, filter labels, disciplines and closing copy for /certificates.' },
  access: { read: () => true, update: authed },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'headlinePrefix', type: 'text', admin: { description: 'Before the italic word, e.g. "Always ".' } },
                { name: 'headlineAccent', type: 'text', admin: { description: 'Italic word, e.g. "sharpening".' } },
                { name: 'headlineSuffix', type: 'text', admin: { description: 'After the italic word, e.g. " the craft.".' } },
              ],
            },
            { name: 'lede', type: 'textarea' },
            { name: 'ledeHighlight', type: 'text', admin: { description: 'Phrase within the lede to emphasise (must match exactly).' } },
            { name: 'signature', type: 'text', admin: { description: 'Handwritten line, e.g. "still a student".' } },
          ],
        },
        {
          label: 'Filter & Disciplines',
          fields: [
            { name: 'filterEyebrow', type: 'text', admin: { description: 'e.g. "Browse".' } },
            { name: 'filterDescription', type: 'text' },
            { name: 'allLabel', type: 'text', admin: { description: 'First filter chip, e.g. "All".' } },
            {
              name: 'disciplines',
              type: 'array',
              admin: { description: 'Discipline filter chips (must match the Discipline values on certificates). "All" is added automatically.' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Closing',
          fields: [
            { name: 'closingEyebrow', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'closingHeadingPrefix', type: 'text' },
                { name: 'closingHeadingAccent', type: 'text', admin: { description: 'Italicised word.' } },
                { name: 'closingHeadingSuffix', type: 'text' },
              ],
            },
            { name: 'closingBody', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'closingCtaLabel', type: 'text' },
                { name: 'closingCtaHref', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
