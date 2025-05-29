import groq from 'groq';
import { IMAGE } from '../components/image';
import { CTA_MARQUEE } from '../components/ctaMarquee';
import { SEO } from '../components/seo';

export const SHOP = groq`
  *[_type == 'shop'][0] {
    'collection': homepageCollection-> {
      'title': store.title,
      'slug': store.slug.current,
      'gid': store.gid,
    },
    ${CTA_MARQUEE},
    creativeImagery[] {
      ${IMAGE}
    },
    ${SEO}
  }
`;