// schema/soundcloud.ts
import { defineType, defineField } from 'sanity'

const soundcloud = defineType({
  name: 'soundcloud',
  type: 'object',
  title: 'Soundcloud Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Soundcloud embed URL'
    })
  ]
});

export default soundcloud;