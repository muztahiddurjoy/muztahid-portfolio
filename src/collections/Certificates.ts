import type { CollectionConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Certificates = credentials & courses. */
export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: { singular: 'Certificate', plural: 'Certificates' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'date', 'credentialId'],
    description: 'Professional credentials & courses.',
  },
  access: {
    read: () => true,
    create: authed,
    update: authed,
    delete: authed,
  },
  defaultSort: '-date',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'issuer', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
        { name: 'dateLabel', type: 'text', admin: { description: 'Display label, e.g. "Jun 2024".' } },
        { name: 'credentialId', type: 'text', required: true },
      ],
    },
    { name: 'skills', type: 'text', hasMany: true },
    {
      name: 'discipline',
      type: 'select',
      options: [
        { label: 'Cloud', value: 'Cloud' },
        { label: 'AI', value: 'AI' },
        { label: 'Robotics', value: 'Robotics' },
        { label: 'Web', value: 'Web' },
      ],
      admin: { position: 'sidebar', description: 'Drives the discipline filter on the certificates page.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Surface this credential on the homepage.' },
    },
    {
      name: 'key',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Stable identifier used for discipline grouping on the frontend (e.g. "aws-ccp").',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Manual override; otherwise sorted by date (newest first).' },
    },
  ],
}
