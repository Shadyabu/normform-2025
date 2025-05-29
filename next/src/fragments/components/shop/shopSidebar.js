import { COLLECTION_CONTENT } from '@/fragments/pages/collectionContent';
import groq from 'groq';

export const SHOP_SIDEBAR = groq`
*[_type == 'shopSidebar'][0] {
  _type,
  collections[] {
    _type,
    _key,
    _id,
    (_type == 'collectionGroup') => {
      title,
      titleCollection-> {
        _id,
        'slug': store.slug.current,
      },
      collections[]-> {
        ${COLLECTION_CONTENT}
      }
    },
    (_type == 'collectionReference') =>  @->{
      ...,
      ${COLLECTION_CONTENT}
    },
  },
  sizes[]-> {
    _type,
    _id,
    title
  },
  colors[]-> {
    _type,
    _id,
    title,
    color {
      hex
    }
  }
}
`;
