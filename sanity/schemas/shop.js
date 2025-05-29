import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'shop',
  title: 'Shop',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Shop',
      hidden: true,
    }),
    defineField({
      name: 'homepageCollection',
      title: 'Homepage Collection',
      type: 'reference',
      to: [
        { type: 'collection' },
      ],
    }),
    defineField({
      name: 'creativeImagery',
      title: 'Creative Imagery',
      type: 'array',
      of: [ { type: 'image', fields: [ defineField({ name: 'altText', type: 'string', title: 'Alt Text' }) ] } ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'ctaMarquee',
      title: 'CTA Marquee',
      type: 'ctaMarquee',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
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
