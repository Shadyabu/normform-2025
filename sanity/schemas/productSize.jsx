export default {
  name: 'productSize',
  title: 'Product Size',
  type: 'document',
  icon: () => '📏',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title
      }
    },
  },
}
