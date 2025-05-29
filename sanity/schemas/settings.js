import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'teaserPage',
      description: 'Show a teaser page instead of the main site.',
      type: 'boolean',
      title: 'Teaser Page',
    }),
    defineField({
      name: 'teaserPageSocialLinks',
      description: 'Social media links to display on the teaser page.',
      title: 'Teaser Page Social Links',
      type: 'array',
      hidden: ({ parent }) => parent?.teaserPage !== true,
      of: [
        defineType({
          name: 'teaserPageSocialLink',
          title: 'Teaser Page Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'link',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle,
                icon: () => '🔗'
              };
            }
          },
        }),
      ],
    }),
    defineField({
      name: 'teaserPagePassword',
      type: 'string',
      title: 'Teaser Page Password',
      hidden: ({ parent }) => parent?.teaserPage !== true,
    }),
    defineField({
      name: 'creativeImagery',
      title: 'Creative Imagery',
      description: 'Creative imagery banner for all pages (not the home page)',
      type: 'array',
      of: [ { type: 'image', fields: [ defineField({ name: 'altText', type: 'string', title: 'Alt Text' }) ] } ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'faviconIco',
      title: 'Favicon (ICO)',
      type: 'file',
    }),
    defineField({
      name: 'faviconPng',
      title: 'Favicon (PNG)',
      type: 'image',
    }),
    defineField({
      name: 'seoDescription',
      description: 'Description to use for SEO purposes and social media sharing.',
      title: 'SEO Description',
      type: 'text',
    }),
    defineField({
      name: 'seoImage',
      description: 'Image to use for SEO purposes and social media sharing. Recommended size: 1200x630px',
      title: 'SEO Image',
      type: 'image',
    }),
    defineField({
      name: 'seoTags',
      description: 'Tags to use for SEO purposes.',
      title: 'SEO Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cookieConsentText',
      description: 'Text to display in the cookie consent banner.',
      title: 'Cookie Consent Text',
      type: 'text',
      options: {
        rows: 3,
      }
    }),
    defineField({
      name: 'footerSocialLinks',
      description: 'Social media links to display in the footer.',
      title: 'Footer Social Links',
      type: 'array',
      of: [
        defineType({
          name: 'footerSocialLink',
          title: 'Footer Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'link',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle,
                icon: () => '🔗',
              };
            }
          },
        }),
      ],
    }),
    defineField({
      name: 'footerLinks',
      description: 'Links to display in the footer.',
      title: 'Footer Links',
      type: 'array',
      of: [ {
        type: 'object',
        name: 'section',
        title: 'Section',
        fields: [
          defineField({
            name: 'titleLinkType',
            title: 'Title Link Type',
            type: 'string',
            initialValue: 'none',
            options: {
              list: [
                { title: 'None', value: 'none' },
                { title: 'Internal', value: 'linkInternal' },
                { title: 'External', value: 'linkExternal' },
                { title: 'Email', value: 'linkEmail' },
              ],
            },
          }),
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            hidden: ({ parent }) => parent?.titleLinkType !== 'none',
          }),
          defineField({
            name: 'titleLinkInternal',
            title: 'Title Link Internal',
            type: 'linkInternal',
            hidden: ({ parent }) => parent?.titleLinkType !== 'linkInternal',
          }),
          defineField({
            name: 'titleLinkExternal',
            title: 'Title Link External',
            type: 'linkExternal',
            hidden: ({ parent }) => parent?.titleLinkType !== 'linkExternal',
          }),
          defineField({
            name: 'titleLinkEmail',
            title: 'Title Link Email',
            type: 'linkEmail',
            hidden: ({ parent }) => parent?.titleLinkType !== 'linkEmail',
          }),
          defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
              { type: 'linkInternal' },
              { type: 'linkExternal' },
              { type: 'linkEmail' },
            ],
          }),
        ],
        preview: {
          select: {
            title: 'title',
            titleLinkInternal: 'titleLinkInternal',
            titleLinkExternal: 'titleLinkExternal',
            titleLinkEmail: 'titleLinkEmail',
            titleLinkType: 'titleLinkType',
            links: 'links',
          },
          prepare({ title, links, titleLinkType, titleLinkInternal, titleLinkExternal, titleLinkEmail }) {
            return {
              title: titleLinkType === 'none' ? title : titleLinkType === 'linkInternal' ? titleLinkInternal?.title : titleLinkType === 'linkExternal' ? titleLinkExternal?.title : titleLinkType === 'linkEmail' ? titleLinkEmail?.title : title,
              subtitle: `${ links?.length > 0 ? links.length : 'no' } links`,
              icon: () => '🔗',
            }
          },
        }
      } ],
    }),
    defineField({
      name: 'gaMeasurementId',
      description: 'Google Analytics Measurement ID to enable you to track your site’s usage.',
      title: 'Google Analytics Measurement ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
    },
    prepare() {
      return {
        title: 'Settings',
      };
    }
  },
});