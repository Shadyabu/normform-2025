import groq from 'groq';
import { PORTABLE_TEXT } from './portableText';

export const SIGNUP_FORM = groq`
*[_type == 'signupForm'][0] {
  'textContent': textContent[] {
    ${PORTABLE_TEXT}
  },
  emailFieldPlaceholder,
  submitButtonText,
  successMessage,
  errorMessage,
  consentStatement,
  formId
}
`;