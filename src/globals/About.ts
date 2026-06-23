import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** The story / about page content. */
export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: { description: 'The story — narrative, philosophy, values and journey.' },
  access: {
    read: () => true,
    update: authed,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Intro',
          fields: [
            { name: 'eyebrow', type: 'text', required: true },
            {
              name: 'headlineLines',
              type: 'array',
              labels: { singular: 'Headline line', plural: 'Headline lines' },
              admin: { description: 'The big hero headline — one row per line. The last line is italicised.' },
              fields: [{ name: 'line', type: 'text', required: true }],
            },
            {
              name: 'headlineAccent',
              type: 'text',
              admin: { description: 'Word(s) in the last headline line to italicise.' },
            },
            { name: 'title', type: 'textarea', required: true, admin: { description: 'Plain-text title used for SEO / fallback.' } },
            { name: 'intro', type: 'textarea', required: true },
            {
              name: 'portrait',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'caption', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'signature', type: 'text', admin: { description: 'Handwritten signature beside the portrait.' } },
                { name: 'narrativeSignature', type: 'text', admin: { description: 'Handwritten pull-line after the first paragraph.' } },
              ],
            },
            {
              name: 'narrative',
              type: 'array',
              required: true,
              labels: { singular: 'Paragraph', plural: 'Narrative' },
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
          ],
        },
        {
          label: 'Philosophy & Values',
          fields: [
            { name: 'philosophyEyebrow', type: 'text', admin: { description: 'Eyebrow above the pull-quote, e.g. "Philosophy".' } },
            {
              name: 'philosophy',
              type: 'group',
              fields: [
                { name: 'quote', type: 'textarea', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
            { name: 'valuesEyebrow', type: 'text', admin: { description: 'Eyebrow above the values grid, e.g. "What I build by".' } },
            { name: 'valuesIntro', type: 'textarea', admin: { description: 'Intro sentence above the values grid.' } },
            {
              name: 'values',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Journey',
          fields: [
            { name: 'journeyEyebrow', type: 'text', admin: { description: 'Eyebrow above the timeline, e.g. "The path so far".' } },
            { name: 'journeyIntro', type: 'textarea', admin: { description: 'Intro sentence beside the timeline eyebrow.' } },
            {
              name: 'journey',
              type: 'array',
              labels: { singular: 'Milestone', plural: 'Journey' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'year', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                  ],
                },
                { name: 'detail', type: 'textarea', required: true },
              ],
            },
            { name: 'nextEyebrow', type: 'text', admin: { description: 'Eyebrow above the closing statement, e.g. "What’s next".' } },
            { name: 'next', type: 'textarea', required: true, admin: { description: 'Closing "what is next" paragraph.' } },
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
            { name: 'metaTitle', type: 'text', admin: { description: 'Browser tab / search title. Defaults to "Story".' } },
            { name: 'metaDescription', type: 'textarea', admin: { description: 'Search / social description. Falls back to the intro.' } },
          ],
        },
      ],
    },
  ],
}
