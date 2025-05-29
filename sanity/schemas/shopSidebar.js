import { defineField } from 'sanity';

const TITLE = 'Shop Sidebar'

export default {
  name: 'shopSidebar',
  title: TITLE,
  type: 'document',
  icon: () => '〰️',
  fields: [
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'collectionGroup',
          label: 'Collection Group',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'titleCollection',
              title: 'Title Collection',
              type: 'reference',
              to: [ { type: 'collection' } ]
            }),
            defineField({
              name: 'collections',
              title: 'Collections',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  name: 'collectionReference',
                  label: 'Collection',
                  to: [{ type: 'collection' }]
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
            prepare(selection) {
              const { title } = selection;
              return {
                title: title,
              };
            },
          },
        },
        {
          type: 'reference',
          name: 'collectionReference',
          label: 'Collection',
          to: [{ type: 'collection' }]
        },
      ],
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'productSizeReference',
          label: 'Product Size',
          to: [{ type: 'productSize' }]
        }
      ],
      options: {
        modal: 'popover',
      }
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'productColorReference',
          label: 'Product Color',
          to: [{ type: 'productColor' }]
        }
      ],
      options: {
        modal: 'dialog',
      }
    },
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
}
