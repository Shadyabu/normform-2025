import groq from 'groq';
import { COLLECTION_CONTENT } from './collectionContent';

export const COLLECTION = groq`
  *[_type == 'collection' && store.slug.current == $slug][0] {
    ${COLLECTION_CONTENT},
  }
`;
