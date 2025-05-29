import groq from 'groq';

export const SIZING_CHART = groq`
  *[_type == 'sizing'][0] {
    rows[] {
      _type,
      (_type == 'heading') => {
        'heading': text
      },
      (_type == 'row') => {
        title,
        sizes[] {
          'sizeName': sizeName->title,
          measurements
        }
      }
    }
  }
`;
