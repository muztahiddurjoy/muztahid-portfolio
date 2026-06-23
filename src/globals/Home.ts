import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Home page content, broken into editable sections: hero (with portrait image),
 * marquee, "now", the manifesto block, the per-section headers, and stats. Each
 * section maps to a designed component on the landing page.
 */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: { description: 'The landing page — hero, manifesto, section headers, marquee, now and stats.' },
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
              name: 'heroPortrait',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Hero portrait image. Falls back to a text placeholder when empty.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'heroCaption', type: 'text', admin: { description: 'Caption shown over the portrait, e.g. "Engineer · Dhaka".' } },
                { name: 'heroBadge', type: 'text', admin: { description: 'Small handwritten badge under the portrait, e.g. "est. 2021".' } },
              ],
            },
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
          label: 'Manifesto',
          fields: [
            {
              name: 'manifesto',
              type: 'group',
              admin: { description: 'The "premise" block below the marquee.' },
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'textarea', admin: { description: 'The large manifesto statement.' } },
                { name: 'headingAccent', type: 'text', admin: { description: 'A word within the heading to italicise (must match exactly).' } },
                { name: 'body', type: 'textarea' },
                { name: 'nowLabel', type: 'text', admin: { description: 'Label above the "now" list, e.g. "currently".' } },
              ],
            },
          ],
        },
        {
          label: 'Section Headers',
          fields: [
            {
              name: 'projectsSection',
              type: 'group',
              label: 'Featured projects header',
              fields: [
                { name: 'eyebrow', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'headingLineOne', type: 'text' },
                    { name: 'headingLineTwo', type: 'text', admin: { description: 'Italicised second line.' } },
                  ],
                },
                { name: 'description', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text' },
                    { name: 'ctaHref', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'writingSection',
              type: 'group',
              label: 'Selected writing header',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text' },
                    { name: 'ctaHref', type: 'text' },
                  ],
                },
                { name: 'itemCtaLabel', type: 'text', admin: { description: 'Per-row "Read" label.' } },
              ],
            },
            {
              name: 'certificatesSection',
              type: 'group',
              label: 'Certificates header',
              fields: [
                { name: 'eyebrow', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'headingLineOne', type: 'text' },
                    { name: 'headingLineTwo', type: 'text', admin: { description: 'Italicised second line.' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text' },
                    { name: 'ctaHref', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'achievementsSection',
              type: 'group',
              label: 'Achievements teaser header',
              fields: [
                { name: 'eyebrow', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'headingLineOne', type: 'text' },
                    { name: 'headingLineTwo', type: 'text', admin: { description: 'Italicised second line.' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text' },
                    { name: 'ctaHref', type: 'text' },
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
            { name: 'statsEyebrow', type: 'text', admin: { description: 'Eyebrow above the stats grid, e.g. "By the numbers".' } },
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
