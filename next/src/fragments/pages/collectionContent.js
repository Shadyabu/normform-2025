import Seo from '@/components/Seo';
import groq from 'groq';

const COLLECTION_CONTENT = groq`
    ...,
    _id,
    "slug": store.slug.current,
    "sortOrder": store.sortOrder,
    "title": store.title,
    "description": store.description
  `;

export { COLLECTION_CONTENT };