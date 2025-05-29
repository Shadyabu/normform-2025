import groq from 'groq';
import { IMAGE } from '../image';

export const LOOK = groq`
  _key,
  _type,
  _id,
  title,
  image {
    ${IMAGE}
  },
  hotspots[] {
    _type,
    x, y,
    product -> {
      "title": store.title,
      "image": store.previewImageUrl,
      "slug": store.slug,
      store {
        gid,
        id
      }
    },
  }
`;
