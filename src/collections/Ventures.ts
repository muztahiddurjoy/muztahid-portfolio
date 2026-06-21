import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Ventures = the founder-framed projects/companies. Card data + a fixed
 * case-study structure (vision / problem / build / outcome) rendered at
 * /ventures/[slug]. Drafts enabled so work-in-progress stays hidden.
 */
export const Ventures: CollectionConfig = {
  slug: 'ventures',
  labels: { singular: 'Venture', plural: 'Ventures' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'year', 'status', 'featured', '_status'],
    description: 'Companies, products, robotics & research — the work, founder-framed.',
  },
  access: {
    read: () => true,
    create: authed,
    update: authed,
    delete: authed,
  },
  versions: { drafts: { autosave: false }, maxPerDoc: 10 },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'tagline', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'role', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'product',
          options: [
            { label: 'Company', value: 'company' },
            { label: 'Product', value: 'product' },
            { label: 'Robotics', value: 'robotics' },
            { label: 'Research', value: 'research' },
          ],
        },
        { name: 'year', type: 'text', required: true },
        { name: 'status', type: 'text', required: true, admin: { description: 'e.g. Active, Shipped, Ongoing' } },
      ],
    },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'Card-level + intro paragraph.' } },
    {
      name: 'cover',
      type: 'group',
      admin: { description: 'Card / case-study hero. Image optional; label+caption are the text placeholder.' },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'caption', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'stack', type: 'text', hasMany: true, admin: { description: 'Tech stack chips.' } },
    {
      name: 'metrics',
      type: 'array',
      maxRows: 8,
      admin: { description: 'Key numbers shown on the card / case study.' },
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
    // ---- case study (fixed structure) ----
    { name: 'vision', type: 'textarea', required: true, admin: { description: 'Case study · the vision.' } },
    { name: 'problem', type: 'textarea', required: true, admin: { description: 'Case study · the problem.' } },
    {
      name: 'build',
      type: 'array',
      labels: { singular: 'Build step', plural: 'Build steps' },
      admin: { description: 'Case study · how it was built (bullet list).' },
      fields: [{ name: 'point', type: 'textarea', required: true }],
    },
    { name: 'outcome', type: 'textarea', required: true, admin: { description: 'Case study · the outcome.' } },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'caption', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    // ---- sidebar ----
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Surface on the homepage & top of the list.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Manual sort. Lower shows first.' },
    },
    slugField('name'),
  ],
}
