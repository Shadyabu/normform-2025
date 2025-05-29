import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'privacy',
  title: 'Privacy',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'richText',
    }),
  ],
  preview: {
    select: {
    },
    prepare() {
      return {
        title: 'Privacy Policy',
      };
    }
  },
});