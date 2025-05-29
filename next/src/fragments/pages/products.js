import groq from 'groq';
import { PRODUCT_CONTENT } from '../components/productContent';

export const PRODUCTS = groq`
  *[_type == 'product' && store.isDeleted != true][]|order(orderRank) {
    ${PRODUCT_CONTENT}
    gallery[0..1] {
      _type,
      (_type == 'image') => {
        'url': asset->url,
        'alt': altText,
      },
      (_type == 'shopify.asset') => {
        'url': url,
        'alt': meta.alt,
      },
    },
    'previewImageUrl': store.previewImageUrl,
  }
`;
