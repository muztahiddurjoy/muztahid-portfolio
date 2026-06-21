import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Contact page copy + channels. */
export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  admin: { description: 'Contact page heading, blurb and the list of channels.' },
  access: {
    read: () => true,
    update: authed,
  },
  fields: [
    { name: 'eyebrow', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'blurb', type: 'textarea', required: true },
    {
      name: 'channels',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
        { name: 'href', type: 'text', admin: { description: 'Optional link (mailto:, https:, ...).' } },
      ],
    },
  ],
}
