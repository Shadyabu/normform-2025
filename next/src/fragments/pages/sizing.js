import groq from 'groq';

export const SIZES = groq`
  *[_type == 'productSize'][] {
    title,
  }
`;
