import groq from 'groq';
import { MARK_DEFS } from './markDefs';
import { IMAGE } from './image';

export const PORTABLE_TEXT = groq`
  ...,
  _type,
  markDefs[] {
    ${MARK_DEFS}
  },
	(_type == 'image') => {
    ${ IMAGE }
  },
  (_type == 'blockDropdown') => {
    title,
    content[] {
      ...,
      _type,
      markDefs[] {
        ${MARK_DEFS}
      },
      (_type == 'image') => {
        ${ IMAGE }
      },
    },
  },
`;
