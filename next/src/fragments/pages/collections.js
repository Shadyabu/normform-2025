import groq from 'groq';
import { COLLECTION_CONTENT } from './collectionContent';

export const COLLECTIONS = groq`
  *[_type == 'collection'][] {
    ${COLLECTION_CONTENT}
  }
`;
