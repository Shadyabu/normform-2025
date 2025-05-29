// schema/bandcamp.ts
import { defineType, defineField } from 'sanity'
import BandCampPreview from '../blockPreviews/bandcamp';

const bandcamp = defineType({
  name: 'bandcamp',
  type: 'object',
  title: 'Bandcamp Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Bandcamp embed URL'
    })
  ],
  preview: {
    select: {
      url: 'url'
    },
  },
  component: {
    preview: BandCampPreview,
  }
});

export default bandcamp;