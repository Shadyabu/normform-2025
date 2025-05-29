import { defineType, defineField } from 'sanity';
import MyCustomImageSrcInput from '../components/MyCustomImageSrcInput'

export default defineType({
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: () => '🛍️',
  fields: [
    defineField({
      name: 'styleWith',
      title: 'Style With',
      description: 'Products to style with this product.',
      type: 'array',
      of: [ {
        type: 'reference',
        to: [ { type: 'product' } ],
      } ],
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
      name: 'sizing',
      title: 'Sizing',
      type: 'richTextSimple',
    }),
    defineField({
      name: 'descriptionSections',
      title: 'Description Sections',
      description: 'Product description sections. This overrides the default product description from Shopify.',
      type: 'array',
      of: [ defineField({
        name: 'section',
        title: 'Section',
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
          }),
          defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
          }),
        ],
        preview: {
          select: { title: 'title' },
          prepare(selection) {
            return {
              title: selection.title,
              subtitle: 'Description Section',
            };
          },
        },
      }) ],
    }),
    defineField({
      type: 'shopify.asset',
      name: 'shopifyAsset',
			hidden: true,
    }),
    defineField({
      name: 'store',
      title: 'Store',
      type: 'object',
			description: 'Shopify store data. This is automatically synced from Shopify so you don’t need to edit it here—to change anything in this section, do it through your Shopify admin account.',
			options: {
				collapsible: true,
				collapsed: true,
			},
      readOnly: true,
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
          description: 'The URL slug of your product (e.g. /products/my-product)',
        }),
        defineField({
          name: 'status',
          title: 'Status',
          type: 'string',
        }),
        defineField({
          name: 'gid',
          title: 'gid',
          type: 'string',
        }),
        defineField({
          name: 'isDeleted',
          title: 'Deleted',
          type: 'boolean',
        }),
        defineField({
          name: 'id',
          title: 'ID',
          type: 'number',
        }),
        defineField({
          name: 'createdAt',
          title: 'Created At',
          type: 'datetime',
          hidden: true,
        }),
        defineField({
          name: 'updatedAt',
          title: 'Updated At',
          type: 'datetime',
          hidden: true,
        }),
        defineField({
          name: 'previewImageUrl',
          title: 'Preview Image',
          type: 'string',
          components: {
            input: MyCustomImageSrcInput,
          },
        }),
        defineField({
          name: 'availableForSale',
          title: 'Available for Sale',
          type: 'boolean',
        }),
        defineField({
          name: 'featuredImage',
          title: 'Featured Image',
          type: 'object',
          fields: [
            defineField({
              name: 'src',
              title: 'Source',
              type: 'string',
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [ {
            name: 'item',
            title: 'Image',
            type: 'object',
            fields: [
              defineField({
                name: 'src',
                title: 'Source',
                type: 'string',
              }),
              defineField({
                name: 'altText',
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
          name: 'productType',
          title: 'Product Type',
          type: 'string',
        }),
        defineField({
          name: 'vendor',
          title: 'Vendor',
          type: 'string',
        }),
        defineField({
          name: 'options',
          title: 'Options',
          type: 'array',
          of: [ {
            name: 'option',
            title: 'Option',
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
              }),
              defineField({
                name: 'values',
                title: 'Values',
                type: 'array',
                of: [ {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                } ],
              }),
            ],
          } ]
        }),
        defineField({
          name: 'priceRange',
          title: 'Price Range',
          type: 'object',
          fields: [
            defineField({
              name: 'minVariantPrice',
              title: 'Min',
              type: 'number',
            }),
            defineField({
              name: 'maxVariantPrice',
              title: 'Max',
              type: 'number',
            }),
          ],
        }),
        defineField({
          name: 'descriptionHtml',
          title: 'Description HTML',
          type: 'text',
          hidden: true,
        }),
        defineField({
          name: 'handle',
          title: 'Handle',
          type: 'string',
          hidden: true,
        }),
        defineField({
          name: 'tags',
          title: 'Tags',
          type: 'string',
          hidden: true,
        }),
        defineField({
          name: 'variants',
          title: 'Variants',
          type: 'array',
          of: [
            {
              title: 'Variant',
              type: 'reference',
              weak: true,
              to: [ { type: 'productVariant' } ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { store: 'store' },
    prepare(selection) {
      const { store } = selection;

      return {
        title: store?.title,
        subtitle: 'Product',
        icon: '🛍️',
        media: store?.previewImageUrl ? () => <img src={ store.previewImageUrl } /> : null,
      };
    },
  },
});
