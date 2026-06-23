import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Chrome / copy for the Achievements page (the entries live in the Achievements collection). */
export const AchievementsPage: GlobalConfig = {
  slug: 'achievements-page',
  label: 'Achievements Page',
  admin: { description: 'Hero, stats labels, highlights, full-record and closing copy for /achievements.' },
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
                { name: 'headingLineOne', type: 'text' },
                { name: 'headingLineTwo', type: 'text', admin: { description: 'Italicised line.' } },
              ],
            },
            { name: 'lede', type: 'textarea' },
            { name: 'signature', type: 'text', admin: { description: 'Handwritten line beside the lede.' } },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'statLabels',
              type: 'array',
              maxRows: 3,
              admin: { description: 'Labels for the three derived stat counts (order matters: total, awards+competitions, leadership).' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Highlights',
          fields: [
            { name: 'highlightsEyebrow', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'highlightsHeading', type: 'text' },
                { name: 'highlightsHeadingAccent', type: 'text', admin: { description: 'Italicised word.' } },
              ],
            },
            { name: 'highlightsBlurb', type: 'textarea' },
            { name: 'leadScript', type: 'text', admin: { description: 'Handwritten label on the lead highlight, e.g. "the gold standard".' } },
          ],
        },
        {
          label: 'Full Record',
          fields: [
            { name: 'recordEyebrow', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'recordHeading', type: 'text' },
                { name: 'recordHeadingAccent', type: 'text', admin: { description: 'Italicised word.' } },
              ],
            },
            { name: 'linkLabel', type: 'text', admin: { description: 'Per-entry external link label, e.g. "Read more".' } },
          ],
        },
        {
          label: 'Closing',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'closingText', type: 'text' },
                { name: 'closingTextAccent', type: 'text', admin: { description: 'Italicised part.' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryCta',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text' },
                    { name: 'href', type: 'text' },
                  ],
                },
                {
                  name: 'secondaryCta',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text' },
                    { name: 'href', type: 'text' },
                  ],
                },
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
