import groq from 'groq';
import { PORTABLE_TEXT } from '../components/portableText';

export const PRIVACY = groq`
  *[_type == 'privacy'][0] {
    privacyPolicy[] {
      ${PORTABLE_TEXT}
    },
  }
`;