import type { Block, CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/* ---- reusable content blocks for the article body (honours "break into blocks") ---- */
const ParagraphBlock: Block = {
  slug: 'paragraph',
  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
  fields: [{ name: 'text', type: 'textarea', required: true }],
}
const HeadingBlock: Block = {
  slug: 'heading',
  labels: { singular: 'Heading', plural: 'Headings' },
  fields: [{ name: 'text', type: 'text', required: true }],
}
const QuoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Pull quote', plural: 'Pull quotes' },
  fields: [{ name: 'text', type: 'textarea', required: true }],
}
const ImageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text' },
  ],
}

/**
 * Articles = the writing / blog. Body is a block-based composer so the editor
 * can mix paragraphs, headings, quotes & images in any order. Rendered at
 * /writing/[slug]. Drafts enabled for an editorial workflow.
 */
export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Writing' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'featured', '_status'],
    description: 'Essays & notes on building, engineering and robotics.',
  },
  access: {
    read: () => true,
    create: authed,
    update: authed,
    delete: authed,
  },
  versions: { drafts: { autosave: false }, maxPerDoc: 20 },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true, admin: { description: 'Card + meta description.' } },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          defaultValue: 'building',
          options: [
            { label: 'Building & Founding', value: 'building' },
            { label: 'Engineering', value: 'engineering' },
            { label: 'Robotics', value: 'robotics' },
            { label: 'Essays', value: 'essays' },
          ],
        },
        { name: 'readTime', type: 'text', required: true, admin: { description: 'e.g. "8 min"' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
        {
          name: 'dateLabel',
          type: 'text',
          admin: { description: 'Optional display label, e.g. "Mar 2026". Auto-derived from date if blank.' },
        },
      ],
    },
    { name: 'tags', type: 'text', hasMany: true },
    {
      name: 'cover',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'caption', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'body',
      type: 'blocks',
      required: true,
      blocks: [ParagraphBlock, HeadingBlock, QuoteBlock, ImageBlock],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    slugField('title'),
  ],
}
