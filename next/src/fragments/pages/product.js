import groq from 'groq';
import { PRODUCT_CONTENT } from '../components/productContent';
import { IMAGE } from '../components/image';

export const PRODUCT = groq`
  *[_type == 'product' && store.slug.current == $slug && store.isDeleted != true][0] {
    creativeImagery[] {
      ${IMAGE}
    },
    ${PRODUCT_CONTENT}
  }
`;
