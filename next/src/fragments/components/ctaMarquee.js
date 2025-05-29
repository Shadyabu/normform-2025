import groq from 'groq';
import { LINK_EXTERNAL } from './linkExternal';
import { LINK_INTERNAL } from './linkInternal';
import { MAILCHIMP_SIGNUP_FORM } from './mailChimpSignupForm';

export const CTA_MARQUEE = groq`
  ctaMarquee {
    text,
    action,
    (action == 'linkExternal') => {
      ${LINK_EXTERNAL}
    },
    (action == 'linkInternal') => {

      ${LINK_INTERNAL}
    },
    (action == 'mailchimpSignupForm') => {
      ${MAILCHIMP_SIGNUP_FORM}
    }
  }
`