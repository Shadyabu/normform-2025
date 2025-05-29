import groq from 'groq';

export const COLORS = groq`
  *[_type == 'productColor'][] {
    title,
    color {
      hex
    },
  }
`;
