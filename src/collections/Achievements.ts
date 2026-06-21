import type { CollectionConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Achievements = awards, competitions, leadership & milestones (timeline). */
export const Achievements: CollectionConfig = {
  slug: 'achievements',
  labels: { singular: 'Achievement', plural: 'Achievements' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'organization', 'type', 'date', 'featured'],
    description: 'Awards, competitions, leadership & milestones — the timeline.',
  },
  access: {
    read: () => true,
    create: authed,
    update: authed,
    delete: authed,
  },
  defaultSort: '-date',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
        {
          name: 'dateLabel',
          type: 'text',
          admin: { description: 'Display label, e.g. "August 2024" or "2024 — Present".' },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'milestone',
          options: [
            { label: 'Award', value: 'award' },
            { label: 'Competition', value: 'competition' },
            { label: 'Leadership', value: 'leadership' },
            { label: 'Milestone', value: 'milestone' },
          ],
        },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'link', type: 'text', admin: { description: 'Optional external link.' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Manual override; otherwise sorted by date (newest first).' },
    },
  ],
}
