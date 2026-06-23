import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Chrome / copy for the Projects LIST page (the projects themselves live in the Projects collection). */
export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Projects Page',
  admin: { description: 'Hero copy, control labels and empty-state for the /projects list page.' },
  access: { read: () => true, update: authed },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text' },
            {
              type: 'row',
              fields: [
                { name: 'headlineLineOne', type: 'text' },
                { name: 'headlineLineTwo', type: 'text', admin: { description: 'Italicised line.' } },
              ],
            },
            { name: 'intro', type: 'textarea' },
            { name: 'countNoun', type: 'text', admin: { description: 'Noun after the count, e.g. "projects".' } },
          ],
        },
        {
          label: 'Controls',
          fields: [
            { name: 'viewLabel', type: 'text', admin: { description: 'e.g. "View".' } },
            {
              type: 'row',
              fields: [
                { name: 'curatedLabel', type: 'text' },
                { name: 'recentLabel', type: 'text' },
                { name: 'featuredLabel', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'allLabel', type: 'text', admin: { description: 'Type filter "All".' } },
                { name: 'ofLabel', type: 'text', admin: { description: 'Between counts, e.g. "of".' } },
                { name: 'featuredBadge', type: 'text', admin: { description: 'Handwritten "featured" badge on rows.' } },
              ],
            },
            { name: 'rowCtaLabel', type: 'text', admin: { description: 'Per-row CTA, e.g. "View project".' } },
          ],
        },
        {
          label: 'Empty State',
          fields: [
            { name: 'emptyScript', type: 'text', admin: { description: 'e.g. "nothing here… yet".' } },
            { name: 'emptyMessageFeatured', type: 'textarea' },
            { name: 'emptyMessageDefault', type: 'textarea' },
            { name: 'emptyCtaLabel', type: 'text' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
