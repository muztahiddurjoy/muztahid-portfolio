import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Chrome / copy for the Writing LIST page (articles live in the Articles collection). */
export const WritingPage: GlobalConfig = {
  slug: 'writing-page',
  label: 'Writing Page',
  admin: { description: 'Hero, featured and archive copy for the /writing list page.' },
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
                { name: 'headlineLineOne', type: 'text' },
                { name: 'headlineLineTwo', type: 'text', admin: { description: 'Italicised line.' } },
              ],
            },
            { name: 'lede', type: 'textarea' },
            { name: 'ledeHighlight', type: 'text', admin: { description: 'Phrase within the lede to emphasise (must match exactly).' } },
            {
              type: 'row',
              fields: [
                { name: 'signature', type: 'text', admin: { description: 'Handwritten line, e.g. "from the desk".' } },
                { name: 'descriptor', type: 'text', admin: { description: 'Trailing descriptor after the count.' } },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            { name: 'featuredEyebrow', type: 'text', admin: { description: 'e.g. "Featured".' } },
            { name: 'featuredCtaLabel', type: 'text', admin: { description: 'e.g. "Read the essay".' } },
            { name: 'archiveEyebrow', type: 'text', admin: { description: 'e.g. "The archive".' } },
            {
              type: 'row',
              fields: [
                { name: 'archiveHeading', type: 'text' },
                { name: 'archiveHeadingAccent', type: 'text', admin: { description: 'Italicised part of the archive heading.' } },
              ],
            },
            { name: 'allLabel', type: 'text', admin: { description: 'Category filter "All".' } },
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
