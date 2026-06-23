import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Contact page copy + channels. */
export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  admin: { description: 'Contact page heading, blurb, invitation, form copy and the list of channels.' },
  access: {
    read: () => true,
    update: authed,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            {
              name: 'titleAccent',
              type: 'text',
              admin: { description: 'A word within the title to italicise (must appear in the title exactly).' },
            },
            { name: 'blurb', type: 'textarea', required: true },
            { name: 'replyTime', type: 'text', admin: { description: 'e.g. "Replies within 48 hours".' } },
          ],
        },
        {
          label: 'Invitation & Form',
          fields: [
            {
              name: 'invitation',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'e.g. "Say hello".' } },
                { name: 'script', type: 'text', admin: { description: 'Handwritten invitation line.' } },
                { name: 'body', type: 'textarea' },
              ],
            },
            {
              name: 'form',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'e.g. "Send a note".' } },
                {
                  type: 'row',
                  fields: [
                    { name: 'nameLabel', type: 'text' },
                    { name: 'namePlaceholder', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'emailLabel', type: 'text' },
                    { name: 'emailPlaceholder', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'messageLabel', type: 'text' },
                    { name: 'messagePlaceholder', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'submitLabel', type: 'text' },
                    { name: 'sendingLabel', type: 'text' },
                  ],
                },
                { name: 'footnote', type: 'text', admin: { description: 'Handwritten note beside the submit button.' } },
              ],
            },
            {
              name: 'channels',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', required: true },
                  ],
                },
                { name: 'href', type: 'text', admin: { description: 'Optional link (mailto:, https:, ...).' } },
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'none',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'LinkedIn', value: 'linkedin' },
                  ],
                  admin: { description: 'Optional brand icon shown beside the value.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Messages',
          fields: [
            {
              name: 'success',
              type: 'group',
              admin: { description: 'Confirmation shown after a message is sent. Use {name} for the sender’s first name.' },
              fields: [
                { name: 'script', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'heading', type: 'text' },
                    { name: 'headingAccent', type: 'text', admin: { description: 'Italicised part of the heading.' } },
                  ],
                },
                { name: 'body', type: 'textarea', admin: { description: 'Use {name} to insert the sender’s first name.' } },
                { name: 'ctaLabel', type: 'text', admin: { description: 'e.g. "Send another".' } },
              ],
            },
            {
              name: 'errorMessages',
              type: 'group',
              admin: { description: 'Client-side validation messages.' },
              fields: [
                { name: 'nameRequired', type: 'text' },
                { name: 'emailRequired', type: 'text' },
                { name: 'emailInvalid', type: 'text' },
                { name: 'messageRequired', type: 'text' },
                { name: 'submitFailed', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', admin: { description: 'Browser tab / search title. Defaults to "Contact".' } },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
