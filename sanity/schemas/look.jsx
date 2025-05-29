import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'look',
  title: 'Look',
  type: 'document',
  icon: () => '🔀',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: `hotspots`,
      type: `array`,
      of: [
        defineField({
          type: 'object', fields: [
            {
              type: 'reference', name: 'product', to: [ { type: 'product' } ]
            },
            {
              type: 'number', name: 'x', title: 'X coordinate', validation: (Rule) => Rule.required()
            },
            {
              type: 'number', name: 'y', title: 'Y coordinate', validation: (Rule) => Rule.required()
            },
          ],
          preview: {
            select: {
              title: 'product.store.title',
              previewImageUrl: 'product.store.previewImageUrl',
            },
            prepare(selection) {
              const { title, previewImageUrl } = selection;
              return {
                title,
                media: previewImageUrl ? () => <img src={ previewImageUrl } /> : null,
              };
            },
          },
        })
      ],
      options: {
        // plugin adds support for this option
        imageHotspot: {
          // see `Image and description path` setup below
          imagePath: `image`,
          // see `Custom tooltip` setup below
          tooltip: undefined,
        }
      },
    }),
  ],
  preview: {
    select: {
      hotspots: 'hotspots',
      image: 'image',
      title: 'title',
    },
    prepare(selection) {
      const { image, title,  } = selection;

      return {
        media: image,
        title,
      };
    },
  },
});
