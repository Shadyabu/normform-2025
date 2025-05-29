// schema/custom.ts
import { defineType, defineField } from 'sanity'
import CustomPreview from '../blockPreviews/custom';

const custom = defineType({
  name: 'custom',
  type: 'object',
  title: 'Custom Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Custom embed code'
    })
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: CustomPreview,
  },
});

export default custom;