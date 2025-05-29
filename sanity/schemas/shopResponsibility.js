import { defineField, defineType } from 'sanity';

const TITLE = 'Responsibility'

export default defineType({
  name: 'shopResponsibility',
  title: TITLE,
  icon: () => '🌍',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richTextSimple'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      };
    },
  },
});
