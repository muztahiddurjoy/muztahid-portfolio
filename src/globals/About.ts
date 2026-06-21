import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** The founder story / about page content. */
export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: { description: 'The founder story — narrative, philosophy, values and journey.' },
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
            { name: 'title', type: 'textarea', required: true },
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
            {
              name: 'philosophy',
              type: 'group',
              fields: [
                { name: 'quote', type: 'textarea', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
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
            { name: 'next', type: 'textarea', required: true, admin: { description: 'Closing "what is next" paragraph.' } },
          ],
        },
      ],
    },
  ],
}
