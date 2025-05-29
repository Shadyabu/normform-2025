// schema/mixcloud.ts
import { defineType, defineField } from 'sanity'
import MixcloudPreview from '../blockPreviews/mixcloud';

const mixcloud = defineType({
  name: 'mixcloud',
  type: 'object',
  title: 'Mixcloud Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Mixcloud embed URL'
    })
  ],
  preview: {
    select: {
      url: 'url'
    },
  },
  component: {
    preview: MixcloudPreview,
  }
});

export default mixcloud;