import groq from 'groq';
import { IMAGE } from '../components/image';
import { LINK_INTERNAL } from '../components/linkInternal';
import { LINK_EXTERNAL } from '../components/linkExternal';
import { LINK_EMAIL } from '../components/linkEmail';

export const SETTINGS = groq`
  *[_type == "settings"][0] {
    teaserPage,
    (teaserPage) => {
      teaserPageSocialLinks[] {
        name,
        link,
        "icon": icon.asset->url,
      },
      teaserPagePassword,
    },
    creativeImagery[] {
      ${IMAGE}
    },
    seoDescription,
    seoImage {
      ${IMAGE}
    },
    footerSocialLinks[] {
      name,
      link
    },
    footerLinks[] {
      _type,
      titleLinkType,
      (titleLinkType == 'none') => {
        title,
      },
      (titleLinkType == 'linkInternal') => {
        'title': titleLinkInternal.title,
        'titleLink': {
          'documentType': titleLinkInternal.reference->_type,
          (titleLinkInternal.reference->_type == 'home') => {
            'slug': '/',
          },
          (titleLinkInternal.reference->_type == 'info') => {
            'slug': '/info',
          },
          (titleLinkInternal.reference->_type == 'shop') => {
            'slug': '/shop',
          },
          (titleLinkInternal.reference->_type == 'privacyPolicy') => {
            'slug': '/privacy',
          },
          (titleLinkInternal.reference->_type == 'termsAndConditions') => {
            'slug': '/terms',
          },
          (titleLinkInternal.reference->_type == 'page') => {
            'slug': titleLinkInternal.reference->slug.current,
          },
          (titleLinkInternal.reference->_type == 'product') => {
            'slug': titleLinkInternal.reference->store.slug,
          },
          (titleLinkInternal.reference->_type == 'collection') => {
            'slug': titleLinkInternal.reference->store.slug,
          },
        },
      },
      (titleLinkType == 'linkExternal') => {
        'title': titleLinkExternal.title,
        'titleLink': titleLinkExternal.url,
      },
      (titleLinkType == 'linkEmail') => {
        'title': titleLinkEmail.title,
        'titleLink': titleLinkEmail.email,
      },
      links[] {
        (_type == 'linkInternal') => {
          ${LINK_INTERNAL}
        },
        (_type == 'linkExternal') => {
          ${LINK_EXTERNAL}
        },
        (_type == 'linkEmail') => {
          ${LINK_EMAIL}
        },
      },
    },
    cookieConsentText,
    "faviconIco": faviconIco.asset->url,
    "faviconPng": faviconPng.asset->url,
    seoTags[],
    gaMeasurementId
  }
`;