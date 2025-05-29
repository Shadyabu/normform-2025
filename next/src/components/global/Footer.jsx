import groq from 'groq';
import { FOOTER_SUBMENU } from '../../fragments/sanity/footerSubmenu';
import {PORTABLE_TEXT} from '../../fragments/sanity/portableText/portableText';
import useSanityQuery from '../../hooks/useSanityQuery';
import FooterContents from '../elements/FooterContents';

/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer() {
  const { data: footer } = useSanityQuery({
    query: QUERY_SANITY
  });
  
  return (
    <FooterContents footer={footer} />
  );
}

const QUERY_SANITY = groq`
  *[_type == 'settings'][0].footer {
    items[]->{
      ${FOOTER_SUBMENU},
    },
    text[]{
      ${PORTABLE_TEXT}
    },
  }
`;