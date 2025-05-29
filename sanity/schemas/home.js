import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏡',
  fields: [
    defineField({
      name: 'splashPageBackgrounds',
      title: 'Splash Page Backgrounds',
      type: 'array',
      of: [ {
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
          defineField({
            name: 'hotspotMobile',
            title: 'Hotspot (Mobile)',
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
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
          }),
        ],
      } ],
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
      name: 'creativeImagery',
      title: 'Creative Imagery',
      description: 'Creative imagery banner for the home page',
      type: 'array',
      of: [ { type: 'image' } ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'shopNowImage',
      title: 'Shop Now Image',
      type: 'image',
    }),
    defineField({
      name: 'shopNowText',
      title: 'Shop Now Text',
      type: 'string',
    }),
    defineField({
      name: 'looksRoulette',
      title: 'Looks Roulette',
      type: 'array',
      of: [ {
        type: 'reference',
        to: [ { type: 'look' } ],
      } ],
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
    }),
    defineField({
      name: 'seoTags',
      title: 'SEO Tags',
      type: 'array',
      of: [ { type: 'string' } ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      media: 'seoImage',
    },
    prepare(selection) {
      const { media } = selection;
      return {
        title: 'Homepage',
        media,
      }
    },
  },
})
