import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/**
 * Sessions = the things I teach, live — online and offline. Card data + a fixed
 * structure (who it's for / what you'll get / how it runs) rendered at
 * /sessions/[slug], plus logistics and a booking request flow. `mode` is the
 * headline filter (online/offline/hybrid); `availability` drives the booking
 * CTA (open → request, waitlist → join, closed → notify). Drafts hide WIP.
 */
export const Sessions: CollectionConfig = {
  slug: 'sessions',
  labels: { singular: 'Session', plural: 'Sessions' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'format', 'mode', 'availability', 'featured', '_status'],
    description: 'Mentorship, workshops, office hours & talks — taught online and in person.',
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
        { name: 'title', type: 'text', required: true },
        { name: 'tagline', type: 'text', required: true, admin: { description: 'One-line hook.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mode',
          type: 'select',
          required: true,
          defaultValue: 'online',
          admin: { description: 'The headline filter on the list page.' },
          options: [
            { label: 'Online', value: 'online' },
            { label: 'In person', value: 'offline' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
        },
        {
          name: 'format',
          type: 'select',
          required: true,
          defaultValue: 'mentoring',
          options: [
            { label: '1:1 Mentoring', value: 'mentoring' },
            { label: 'Workshop', value: 'workshop' },
            { label: 'Talk', value: 'talk' },
            { label: 'Consultation', value: 'consultation' },
            { label: 'Cohort', value: 'cohort' },
            { label: 'Office Hours', value: 'office-hours' },
          ],
        },
        {
          name: 'level',
          type: 'select',
          required: true,
          defaultValue: 'all',
          options: [
            { label: 'All levels', value: 'all' },
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
      ],
    },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'Card-level + intro paragraph.' } },
    {
      name: 'cover',
      type: 'group',
      admin: { description: 'List row + detail hero. Image optional; label+caption are the placeholder shown until an image is added.' },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'caption', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'logistics',
      type: 'group',
      admin: { description: 'The practical details shown on the card & in the booking panel.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'duration', type: 'text', admin: { description: 'e.g. "60 min · weekly".' } },
            { name: 'price', type: 'text', admin: { description: 'e.g. "Free", "$40 / session", "On request".' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'capacity', type: 'text', admin: { description: 'e.g. "1:1", "Up to 8".' } },
            { name: 'location', type: 'text', admin: { description: 'Offline venue OR online platform.' } },
          ],
        },
        { name: 'languages', type: 'text', hasMany: true },
        { name: 'deliveryNote', type: 'textarea', admin: { description: 'Optional note on how it’s delivered.' } },
      ],
    },
    { name: 'topics', type: 'text', hasMany: true, admin: { description: 'Topic chips.' } },
    { name: 'audience', type: 'textarea', required: true, admin: { description: 'Who it’s for.' } },
    {
      name: 'highlights',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      admin: { description: 'What you’ll get (bullet list).' },
      fields: [{ name: 'point', type: 'textarea', required: true }],
    },
    {
      name: 'agenda',
      type: 'array',
      labels: { singular: 'Agenda step', plural: 'Agenda' },
      admin: { description: 'How it runs (ordered outline).' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'detail', type: 'textarea', required: true },
      ],
    },
    {
      name: 'prerequisites',
      type: 'array',
      labels: { singular: 'Prerequisite', plural: 'Prerequisites' },
      admin: { description: 'What attendees need beforehand. Leave empty to hide the section.' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'faqs',
      type: 'array',
      labels: { singular: 'FAQ', plural: 'FAQs' },
      admin: { description: 'Common questions. Leave empty to hide the section.' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: { description: 'Social proof. Leave empty to hide the section.' },
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        {
          type: 'row',
          fields: [
            { name: 'author', type: 'text', required: true },
            { name: 'role', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'booking',
      type: 'group',
      admin: { description: 'How the primary CTA behaves. The on-page request form is always available as a fallback.' },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'form',
          options: [
            { label: 'On-page request form', value: 'form' },
            { label: 'External scheduler link', value: 'link' },
            { label: 'Direct email', value: 'email' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'url', type: 'text', admin: { description: 'Scheduler URL (Calendly/Cal.com) — used when type is "link".' } },
            { name: 'email', type: 'text', admin: { description: 'Used when type is "email". Falls back to the site email.' } },
          ],
        },
        { name: 'note', type: 'text', admin: { description: 'Small reassurance under the CTA, e.g. reply time.' } },
      ],
    },
    {
      name: 'links',
      type: 'array',
      admin: { description: 'Optional external links (syllabus, recording, etc.).' },
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
    // ---- sidebar ----
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Surface in the Featured view & pin to the top of the list.' },
    },
    {
      name: 'availability',
      type: 'select',
      required: true,
      defaultValue: 'open',
      admin: { position: 'sidebar', description: 'Drives the booking CTA: open → request, waitlist → join, closed → notify.' },
      options: [
        { label: 'Booking open', value: 'open' },
        { label: 'Waitlist', value: 'waitlist' },
        { label: 'Closed for now', value: 'closed' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
        description: 'Next run / last update. Drives the "Soonest" view.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Manual / curated sort. Lower shows first.' },
    },
    slugField('title'),
  ],
}
