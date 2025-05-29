import groq from 'groq';
import { IMAGE } from '../components/image';
import { CTA_MARQUEE } from '../components/ctaMarquee';
import { LOOK } from '../components/shop/look';
import { SEO } from '../components/seo';

export const HOME = groq`
  *[_type == 'home'][0] {
    splashPage,
    splashPageBackgrounds[] {
      alt,
      hotspotDesktop {
        x, y,
      },
      hotspotMobile {
        x, y,
      },
      ${IMAGE}
    },
    ${CTA_MARQUEE},
    creativeImagery[] {
      ${IMAGE}
    },
    shopNowImage {
      ${IMAGE}
    },
    shopNowText,
    looksRoulette[]-> {
      ${LOOK}
    },
    ${SEO}
  }
`;