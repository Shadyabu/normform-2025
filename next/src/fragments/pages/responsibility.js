import groq from 'groq';
import { PORTABLE_TEXT } from '../components/portableText';

export const RESPONSIBILITY = groq`
  *[_type == 'shopResponsibility'][0] {
    content[] {
      ${PORTABLE_TEXT}
    }
  }
`;
