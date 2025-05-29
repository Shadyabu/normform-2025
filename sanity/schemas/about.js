import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: () => 'ℹ️',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'richTextSimple',
    }),
    defineField({
      name: 'seoImage',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'hotspotDesktop',
          title: 'Hotspot (Desktop)',
          type: 'object',
          fields: [
            defineField({
              name: 'x',
              title: 'X (%)',
              type: 'number',
            }),
            defineField({
              name: 'y',
              title: 'Y (%)',
              type: 'number',
            }),
          ],
          options: {
            columns: 2,
          },
        }),
        // defineField({
        //   name: 'hotspotMobile',
        //   title: 'Hotspot (Mobile)',
        //   type: 'object',
        //   fields: [
        //     defineField({
        //       name: 'x',
        //       title: 'X (%)',
        //       type: 'number',
        //     }),
        //     defineField({
        //       name: 'y',
        //       title: 'Y (%)',
        //       type: 'number',
        //     }),
        //   ],
        //   options: {
        //     columns: 2,
        //   },
        // }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ctaMarquee',
      title: 'CTA Marquee',
      type: 'ctaMarquee',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: `About`,
      }
    },
  },
})
