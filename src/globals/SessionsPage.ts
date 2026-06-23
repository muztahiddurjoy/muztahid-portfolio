import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Chrome / copy for the Sessions LIST page (the sessions live in the Sessions collection). */
export const SessionsPage: GlobalConfig = {
  slug: 'sessions-page',
  label: 'Sessions Page',
  admin: { description: 'Hero copy, control labels and empty-state for the /sessions list page.' },
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
            { name: 'intro', type: 'textarea' },
            { name: 'countNoun', type: 'text', admin: { description: 'Noun after the count, e.g. "sessions".' } },
          ],
        },
        {
          label: 'Controls',
          fields: [
            { name: 'viewLabel', type: 'text', admin: { description: 'e.g. "View".' } },
            {
              type: 'row',
              fields: [
                { name: 'curatedLabel', type: 'text' },
                { name: 'recentLabel', type: 'text', admin: { description: 'Sort by soonest date, e.g. "Soonest".' } },
                { name: 'featuredLabel', type: 'text' },
              ],
            },
            { name: 'modeLabel', type: 'text', admin: { description: 'Label for the mode chip group, e.g. "Mode".' } },
            {
              type: 'row',
              fields: [
                { name: 'allLabel', type: 'text', admin: { description: 'Mode filter "All".' } },
                { name: 'ofLabel', type: 'text', admin: { description: 'Between counts, e.g. "of".' } },
                { name: 'featuredBadge', type: 'text', admin: { description: 'Handwritten badge on featured rows.' } },
              ],
            },
            { name: 'rowCtaLabel', type: 'text', admin: { description: 'Per-row CTA, e.g. "See the session".' } },
          ],
        },
        {
          label: 'Empty State',
          fields: [
            { name: 'emptyScript', type: 'text', admin: { description: 'e.g. "nothing on the calendar… yet".' } },
            { name: 'emptyMessageFeatured', type: 'textarea' },
            { name: 'emptyMessageDefault', type: 'textarea' },
            { name: 'emptyCtaLabel', type: 'text' },
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
