import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Alt text for accessibility (images). Leave blank for non-image files like the CV.' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional caption.' },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 960 },
      { name: 'hero', width: 1600 },
    ],
  },
}
