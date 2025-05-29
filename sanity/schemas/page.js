import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'seoImage',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'seoImage',
    },
    prepare({ title, media }) {
      return {
        title,
        icon: () => '📄',
        media,
        subtitle: 'page'
      }
    },
  },
})
