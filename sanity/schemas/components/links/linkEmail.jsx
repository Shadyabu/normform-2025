import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity';

export default defineType({
  title: 'Email Link',
  name: 'linkEmail',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    // Email
    defineField({
      title: 'Email',
      name: 'email',
      type: 'email',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'email',
    },
    prepare(selection) {
      const { title } = selection;

      return {
        subtitle: 'Email',
        title,
      };
    },
  },
});
