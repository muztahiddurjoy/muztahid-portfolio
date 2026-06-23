import type { GlobalConfig } from 'payload'

const authed = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

/** Labels & copy for the session DETAIL page (/sessions/[slug]) — section headings,
 *  the booking form, and the prev/next pager. The sessions themselves live in the
 *  Sessions collection. */
export const SessionPage: GlobalConfig = {
  slug: 'session-page',
  label: 'Session Detail',
  admin: { description: 'Section labels, booking-form copy and pager for individual session pages.' },
  access: { read: () => true, update: authed },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          fields: [
            {
              name: 'detail',
              type: 'group',
              fields: [
                { name: 'logisticsLabel', type: 'text', admin: { description: 'Heading over the logistics grid.' } },
                {
                  type: 'row',
                  fields: [
                    { name: 'durationLabel', type: 'text' },
                    { name: 'priceLabel', type: 'text' },
                    { name: 'capacityLabel', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'locationLabel', type: 'text' },
                    { name: 'modeLabel', type: 'text' },
                    { name: 'languagesLabel', type: 'text' },
                  ],
                },
                { name: 'availabilityLabel', type: 'text' },
                { name: 'topicsLabel', type: 'text', admin: { description: 'Handwritten label over the topic chips.' } },
                {
                  type: 'row',
                  fields: [
                    { name: 'audienceLabel', type: 'text' },
                    { name: 'highlightsLabel', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'agendaLabel', type: 'text' },
                    { name: 'prerequisitesLabel', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'faqLabel', type: 'text' },
                    { name: 'testimonialsLabel', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Booking',
          fields: [
            {
              name: 'booking',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'heading', type: 'text' },
                    { name: 'headingAccent', type: 'text', admin: { description: 'Word within the heading to italicise.' } },
                  ],
                },
                { name: 'body', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'openLabel', type: 'text', admin: { description: 'CTA when availability is open.' } },
                    { name: 'waitlistLabel', type: 'text', admin: { description: 'CTA when availability is waitlist.' } },
                    { name: 'closedLabel', type: 'text', admin: { description: 'CTA when availability is closed.' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'externalLabel', type: 'text', admin: { description: 'CTA for an external scheduler link.' } },
                    { name: 'orFormLabel', type: 'text', admin: { description: 'Bridge text to the fallback form.' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'nameLabel', type: 'text' },
                    { name: 'emailLabel', type: 'text' },
                    { name: 'goalLabel', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'namePlaceholder', type: 'text' },
                    { name: 'emailPlaceholder', type: 'text' },
                    { name: 'goalPlaceholder', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'preferredModeLabel', type: 'text' },
                    { name: 'preferredDateLabel', type: 'text' },
                    { name: 'preferredDateHint', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'submitLabel', type: 'text' },
                    { name: 'sendingLabel', type: 'text' },
                    { name: 'footnote', type: 'text' },
                  ],
                },
                {
                  name: 'success',
                  type: 'group',
                  admin: { description: 'Confirmation shown after a request is sent. Use {name} for the requester’s first name.' },
                  fields: [
                    { name: 'script', type: 'text' },
                    {
                      type: 'row',
                      fields: [
                        { name: 'heading', type: 'text' },
                        { name: 'headingAccent', type: 'text' },
                      ],
                    },
                    { name: 'body', type: 'textarea' },
                    { name: 'ctaLabel', type: 'text' },
                  ],
                },
                {
                  // Named `errorMessages` (not `errors`) — `errors` is a reserved
                  // Mongoose schema pathname. Mapped back to `errors` in the UI shape.
                  name: 'errorMessages',
                  type: 'group',
                  fields: [
                    { name: 'nameRequired', type: 'text' },
                    { name: 'emailRequired', type: 'text' },
                    { name: 'emailInvalid', type: 'text' },
                    { name: 'goalRequired', type: 'text' },
                    { name: 'submitFailed', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Pager',
          fields: [
            {
              name: 'pager',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'prevLabel', type: 'text' },
                    { name: 'nextLabel', type: 'text' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'latestLabel', type: 'text' },
                    { name: 'startLabel', type: 'text' },
                  ],
                },
                { name: 'allLabel', type: 'text' },
                { name: 'allScript', type: 'text' },
                { name: 'backLinkLabel', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
