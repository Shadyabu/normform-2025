export default {
  name: 'productColor',
  icon: () => '🎨',
  title: 'Product Color',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'color',
      type: 'color',
      label: 'Color'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'color.hex'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle,
        media: () => (
          <div
            style={ {
              backgroundColor: subtitle,
              height: '1em',
              width: '1em',
            } }
          />
        )
      }
    },
  },
}
