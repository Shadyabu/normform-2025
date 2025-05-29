import groq from 'groq';
import { IMAGE } from '../components/image';
import { PORTABLE_TEXT } from '../components/portableText';
import { SEO } from '../components/seo';

export const ABOUT = groq`
  *[_type == 'about'][0] {
    text[] {
      ${PORTABLE_TEXT}
    },
    seoImage {
      alt,
      hotspotDesktop {
        x, y,
      },
      hotspotMobile {
        x, y,
      },
      ${IMAGE}
    },
    ${SEO}
  }
`;