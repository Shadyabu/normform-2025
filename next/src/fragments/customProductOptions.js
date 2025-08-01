import groq from 'groq';

export const CUSTOM_PRODUCT_OPTIONS = groq`
  _key,
  _type,
  title,
  (_type == 'customProductOptionColor') => {
    colors[] {
      "hex": color.hex,
      title,
    },
  },
  (_type == 'customProductOption.size') => {
    sizes[] {
      height,
      title,
      width
    },
  },
`;
