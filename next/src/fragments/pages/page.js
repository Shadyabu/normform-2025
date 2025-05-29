import groq from 'groq';
import { IMAGE } from '../components/image';
import { PORTABLE_TEXT } from '../components/portableText';

export const PAGE = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    title,
    'slug': slug.current,
    seoImage {
      ${IMAGE}
    },
    content[] {
      ${PORTABLE_TEXT}
    },
  }
`;