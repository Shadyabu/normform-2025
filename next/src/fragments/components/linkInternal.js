import groq from 'groq';

export const LINK_INTERNAL = groq`
  _key,
  _type,
  title,
  ...reference-> {
    'documentType': _type,
    (_type == 'home') => {
      'slug': '/',
    },
    (_type == 'info') => {
      'slug': '/info',
    },
    (_type == 'shop') => {
      'slug': '/shop',
    },
    (_type == 'privacyPolicy') => {
      'slug': '/privacy-policy',
    },
    (_type == 'page') => {
      'slug': slug.current,
    },
    (_type == 'product') => {
      'slug': store.slug.current,
    },
    (_type == 'collection') => {
      'slug': store.slug.current,
    },
  }
`;
