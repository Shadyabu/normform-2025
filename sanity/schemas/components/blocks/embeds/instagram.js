// schema/instagram.ts
import { defineType, defineField } from 'sanity'
import InstagramPreview from '../blockPreviews/instagram';

const instagram = defineType({
  name: 'instagram',
  type: 'object',
  title: 'Instagram Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Instagram URL'
    })
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: InstagramPreview,
  },
});

export default instagram;