import type { Field } from 'payload'

/** Normalise an arbitrary string into a URL-safe slug. */
export const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Reusable slug field. Lives in the sidebar, auto-derives from `sourceField`
 * (e.g. `name` / `title`) when left blank, and is normalised on every save so
 * an editor can never persist an invalid slug.
 */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL segment. Leave blank to auto-generate from the title/name.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data, originalDoc }) => {
        if (typeof value === 'string' && value.length > 0) return formatSlug(value)
        const source = (data?.[sourceField] ?? originalDoc?.[sourceField]) as unknown
        if (typeof source === 'string' && source.length > 0) return formatSlug(source)
        return value
      },
    ],
  },
})
