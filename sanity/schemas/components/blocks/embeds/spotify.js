// schema/spotify.ts
import { defineType, defineField } from 'sanity'
import SpotifyPreview from '../blockPreviews/spotify';

const spotify = defineType({
  name: 'spotify',
  type: 'object',
  title: 'Spotify Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Spotify link'
    })
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: SpotifyPreview,
  },
});

export default spotify;