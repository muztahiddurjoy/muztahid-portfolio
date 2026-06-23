import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Shared labels for every project DETAIL page (/projects/[slug]). */
export const ProjectPage: GlobalConfig = {
  slug: 'project-page',
  label: 'Project Detail Labels',
  admin: { description: 'Shared section labels & pager copy rendered on every project case study.' },
  access: { read: () => true, update: authed },
  fields: [
    {
      name: 'caseStudy',
      type: 'group',
      label: 'Case-study section labels',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'visionLabel', type: 'text' },
            { name: 'problemLabel', type: 'text' },
            { name: 'buildLabel', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'outcomeLabel', type: 'text' },
            { name: 'galleryLabel', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'builtWithLabel', type: 'text', admin: { description: 'e.g. "built with".' } },
            { name: 'proofLabel', type: 'text', admin: { description: 'e.g. "the proof".' } },
          ],
        },
      ],
    },
    {
      name: 'pager',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'prevLabel', type: 'text', admin: { description: 'e.g. "Previous project".' } },
            { name: 'nextLabel', type: 'text', admin: { description: 'e.g. "Next project".' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'latestLabel', type: 'text', admin: { description: 'End-cap, e.g. "That’s the latest".' } },
            { name: 'startLabel', type: 'text', admin: { description: 'End-cap, e.g. "Back to the start".' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'allProjectsLabel', type: 'text', admin: { description: 'e.g. "All projects".' } },
            { name: 'allProjectsScript', type: 'text', admin: { description: 'e.g. "the full body of work".' } },
          ],
        },
        { name: 'backLinkLabel', type: 'text', admin: { description: 'Back link, e.g. "All projects".' } },
      ],
    },
  ],
}
