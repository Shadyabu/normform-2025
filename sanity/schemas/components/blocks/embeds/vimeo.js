// schema/vimeo.ts
import { defineType, defineField } from 'sanity'
import VimeoPreview from '../blockPreviews/vimeo';

const vimeo = defineType({
  name: 'vimeo',
  type: 'object',
  title: 'Vimeo Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Vimeo video URL'
    })
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: VimeoPreview,
  },
});

export default vimeo;