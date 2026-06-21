import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Home page content, broken into editable sections: hero, marquee, "now",
 * and stats. Each section maps to a designed component on the landing page.
 */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: { description: 'The landing page — hero, marquee, what you are doing now, and stats.' },
  access: {
    read: () => true,
    update: authed,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text', required: true },
            {
              name: 'headline',
              type: 'array',
              required: true,
              labels: { singular: 'Headline line', plural: 'Headline lines' },
              admin: { description: 'Each row is one line of the big headline.' },
              fields: [{ name: 'line', type: 'text', required: true }],
            },
            {
              name: 'headlineAccent',
              type: 'text',
              admin: { description: 'A word within the headline to italicise (must match exactly).' },
            },
            { name: 'script', type: 'text', admin: { description: 'Small handwritten accent line.' } },
            { name: 'lede', type: 'textarea', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryCta',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
                {
                  name: 'secondaryCta',
                  type: 'group',
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
          label: 'Marquee & Now',
          fields: [
            {
              name: 'marquee',
              type: 'array',
              labels: { singular: 'Marquee item', plural: 'Marquee items' },
              admin: { description: 'Scrolling list of org / project names.' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'now',
              type: 'array',
              labels: { singular: 'Now item', plural: 'Now items' },
              admin: { description: '"What I am doing now" rows.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 8,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'number', required: true },
                    { name: 'suffix', type: 'text', admin: { description: 'e.g. "+"' } },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
