import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Projects = the things I build. Card data + a fixed case-study structure
 * (vision / problem / build / outcome) rendered at /projects/[slug].
 * `featured` surfaces a project on the homepage; `date` drives the "Recent"
 * view; `order` is the manual/curated sort. Drafts keep WIP hidden.
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'year', 'status', 'featured', '_status'],
    description: 'Products, systems, robots & experiments — the things I build.',
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
            { label: 'Product', value: 'product' },
            { label: 'Company', value: 'company' },
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
      admin: { description: 'Card / case-study hero. Image optional; label+caption are the text placeholder shown until an image is added.' },
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
        {
          name: 'proof',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Feature this metric as the headline "proof" stat on the case study. First proof wins; falls back to the first metric.' },
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
      admin: { position: 'sidebar', description: 'Surface on the homepage & pin to the top of the list.' },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
        description: 'Build / ship date. Drives the "Recent" view. Falls back to the Year field when blank.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Manual / curated sort. Lower shows first.' },
    },
    slugField('name'),
  ],
}
