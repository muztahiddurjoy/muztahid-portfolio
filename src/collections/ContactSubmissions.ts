import type { CollectionConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Stores contact-form entries. Anyone may create (the public form posts here),
 * but only authenticated admins can read/update/delete. A honeypot field is
 * rejected server-side in the submit route for spam mitigation.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Submission', plural: 'Contact submissions' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
    description: 'Messages sent through the contact form.',
    group: 'System',
  },
  access: {
    create: () => true,
    read: authed,
    update: authed,
    delete: authed,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'meta',
      type: 'group',
      admin: { readOnly: true },
      fields: [{ name: 'submittedFrom', type: 'text' }],
    },
  ],
}
