import type { CollectionConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Booking requests submitted from a session's detail page. Anyone may create
 * (the public form posts here), but only authenticated admins can read/manage.
 * A honeypot is rejected server-side in the submit route for spam mitigation.
 */
export const SessionRequests: CollectionConfig = {
  slug: 'session-requests',
  labels: { singular: 'Session request', plural: 'Session requests' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'sessionTitle', 'preferredMode', 'createdAt'],
    description: 'Booking requests sent from session pages.',
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
    { name: 'goal', type: 'textarea', required: true, admin: { description: 'What the requester wants out of the session.' } },
    {
      type: 'row',
      fields: [
        {
          name: 'preferredMode',
          type: 'select',
          options: [
            { label: 'Online', value: 'online' },
            { label: 'In person', value: 'offline' },
            { label: 'Either', value: 'either' },
          ],
        },
        { name: 'preferredDate', type: 'text', admin: { description: 'Free-text preferred date/time.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'sessionTitle', type: 'text', admin: { readOnly: true, description: 'Which session this request came from.' } },
        { name: 'sessionSlug', type: 'text', admin: { readOnly: true } },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      admin: { readOnly: true },
      fields: [{ name: 'submittedFrom', type: 'text' }],
    },
  ],
}
