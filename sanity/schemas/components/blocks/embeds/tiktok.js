// schema/tiktok.ts
import { defineType, defineField } from 'sanity'
import TiktokPreview from '../blockPreviews/tiktok';

const tiktok = defineType({
  name: 'tiktok',
  type: 'object',
  title: 'Tiktok Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Tiktok URL'
    })
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: TiktokPreview,
  },
});

export default tiktok;