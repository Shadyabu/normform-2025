import { defineArrayMember } from 'sanity';

export default {
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        annotations: [
          // Internal
          {
            name: 'annotationLinkInternal',
            type: 'annotationLinkInternal',
          },
          // URL
          {
            name: 'annotationLinkExternal',
            type: 'annotationLinkExternal',
          },
          // Email
          {
            name: 'annotationLinkEmail',
            type: 'annotationLinkEmail',
          },
        ],
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
      },
      // Regular styles
      styles: [
        {
          title: 'Heading',
          value: 'h2',
        },
      ],
      // Paragraphs
      type: 'block',
    }),
    defineArrayMember({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          options: {
            isHighlighted: true,
          },
        },
      ],
    }),
    defineArrayMember({
      name: 'blockDropdown',
      title: 'Dropdown',
      type: 'blockDropdown',
    }),
  ],
}
