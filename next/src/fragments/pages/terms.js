import groq from 'groq';
import { PORTABLE_TEXT } from '../components/portableText';

export const TERMS = groq`
  *[_type == 'terms'][0] {
    termsAndConditions[] {
      ${PORTABLE_TEXT}
    },
  }
`;