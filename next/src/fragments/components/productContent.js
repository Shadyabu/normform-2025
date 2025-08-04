import groq from 'groq';
import { CUSTOM_PRODUCT_OPTIONS } from '../customProductOptions';
import { PORTABLE_TEXT } from './portableText';
import { PORTABLE_TEXT_MINI } from './portableTextMini';

export const PRODUCT_CONTENT = groq`
  ...,
  "title": store.title,
  "slug": store.slug.current,
  descriptionSections[] {
    title,
    content,
  },
  styleWith[]-> {
    "title": store.title,
    "slug": store.slug.current,
    "previewImageUrl": store.previewImageUrl,
  },
  "shopifyId": store.id,
  "previewImageUrl": store.previewImageUrl,
  "status": store.status,
  "price": store.priceRange.minVariantPrice,
  "isDeleted": store.isDeleted,
  "variants": store.variants[]-> {
    "id": store.id,
    "gid": store.gid,
    "title": store.title,
    "option1": store.option1,
    "option2": store.option2,
    "option3": store.option3,
    "quantityAvailable": store.quantityAvailable,
    "price": store.price,
    "isAvailable": store.inventory.isAvailable,
  },
  creativeImagery[] {
    "url": asset->url,
    "alt": asset->altText,
  },
  sizing[] {
    ${PORTABLE_TEXT_MINI}
  },
  _id,
  "available": !store.isDeleted && store.status == 'active',
  body[]{
    ${PORTABLE_TEXT}
  },
  "customProductOptions": *[_type == 'settings'][0].customProductOptions[title in ^.store.options[].name] {
    ${CUSTOM_PRODUCT_OPTIONS}
  },
  scrollingText,
  "gid": store.gid
`;