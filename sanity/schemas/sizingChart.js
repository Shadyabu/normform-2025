import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sizing',
  title: 'Sizing Chart',
  type: 'document',
  icon: () => '📏',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'text',
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title,
                icon: () => '🔠',
              }
            },
          },
        }),
        defineField({
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [
                defineField({
                  name: 'size',
                  title: 'Size',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'sizeName',
                      title: 'Size Name',
                      type: 'reference',
                      to: [ { type: 'productSize' } ],
                    }),
                    defineField({
                      name: 'measurements',
                      title: 'Measurements',
                      type: 'string',
                    }),
                  ],
                  options: {
                    columns: 2,
                    editModal: 'popover',
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              sizes: 'sizes',
            },
            prepare(selection) {
              const { title, sizes } = selection;
              const subtitle = sizes.map((size) => {
                const measurements = size.measurements;
                return `${measurements}`;
              }).join(' | ');
              return {
                title,
                subtitle,
                icon: () => '📏',
              }
            },
          },
        }),
      ],
      preview: {
        select: {
          title: 'title',
          sizes: 'sizes',
        },
        prepare(selection) {
          const { title, sizes } = selection;
          const subtitle = sizes.map(({ size }) => size).join(' | ');
          return {
            title,
            subtitle,
            icon: '📏',
          }
        },
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sizing Chart' }
    },
  },
})
