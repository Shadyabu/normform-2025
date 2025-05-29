import groq from 'groq';
import { PORTABLE_TEXT } from './portableText';

export const MAILCHIMP_SIGNUP_FORM = groq`
  title,
  "textContent": textContent.content[] {
    ${PORTABLE_TEXT}
  },
  emailFieldPlaceholder,
  submitButtonText,
  formId
`;