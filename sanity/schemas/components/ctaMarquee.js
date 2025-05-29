import { EllipsisHorizontalIcon } from '@sanity/icons'
import { defineField } from 'sanity';

export default {
  name: 'ctaMarquee',
  title: 'Scrolling Marquee with optional CTA',
  icon: EllipsisHorizontalIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string'
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
      initialValue: 'none',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Link Internal', value: 'linkInternal' },
          { title: 'Link External', value: 'linkExternal' },
          { title: 'MailChimp Signup Form', value: 'mailchimpSignupForm' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'linkInternal',
      title: 'Link Internal',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.action !== 'linkInternal',
    }),
    defineField({
      name: 'linkExternal',
      title: 'Link External',
      type: 'url',
      hidden: ({ parent }) => parent?.action !== 'linkExternal',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'action',
    },
    prepare(selection) {
      const { title, subtitle } = selection;

      return {
        title,
        subtitle: subtitle === 'none' ? 'No action' : subtitle,
      }
    },
  },
}
