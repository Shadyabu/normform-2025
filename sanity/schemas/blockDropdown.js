/**
 * Annotations are ways of marking up text in the block content editor.
 *
 * Read more: https://www.sanity.io/docs/customization#f924645007e1
 */

import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  title: 'Dropdown',
  name: 'blockDropdown',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          // Styles let you set what your user can mark up blocks with. These
          // correspond with HTML tags, but you can set any title or value
          // you want and decide how you want to deal with it where you want to
          // use your content.
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          // Marks let you mark up inline text in the block editor.
          marks: {
            // Decorators usually describe a single property – e.g. a typographic
            // preference or highlighting by editors.
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            // Annotations can be any object structure – e.g. a link or a footnote.
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              {
                title: 'Email',
                name: 'email',
                type: 'object',
                fields: [
                  {
                    title: 'Email',
                    name: 'href',
                    type: 'email',
                  },
                ],
              },
            ],
          },
        }),
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        defineArrayMember({
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      content: 'content',
    },
    prepare: ({ heading, content }) => {
      // output the content as plain text
      let text = 'No content';
      if (content) {
        text = content
          .map((block) => {
            if (block._type === 'block') {
              return block.children.map((child) => child.text).join('');
            }
            return '';
          })
          .join(' ');
      }
      return {
        title: `Dropdown—${ heading ?? 'no heading' }`,
        subtitle: text,
        icon: () => '🪗',
      };
    },
  },
});
