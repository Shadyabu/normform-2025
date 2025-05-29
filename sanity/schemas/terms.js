import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'terms',
  title: 'Terms',
  type: 'document',
  icon: () => '📃',
  fields: [
    defineField({
      name: 'termsAndConditions',
      title: 'Terms and Conditions',
      type: 'richText',
    }),
  ],
  preview: {
    select: {
    },
    prepare() {
      return {
        title: 'Terms and Conditions',
      };
    }
  },
});