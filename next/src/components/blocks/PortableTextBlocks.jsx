import { PortableText } from '@portabletext/react';
import LinkAnnotation from '../annotations/LinkAnnotation';
import ListBlock from './BlockList';
import ImageBlock from './types/ImageBlock';
import BlockDropdown from './BlockDropdown';

export const portableTextComponents = {
  // Lists
  list: ListBlock,
  // Marks
  marks: {
    annotationLinkEmail: LinkAnnotation,
    annotationLinkExternal: LinkAnnotation,
    annotationLinkInternal: LinkAnnotation,
  },
  types: {
    image: ImageBlock,
    blockDropdown: ({ value }) => {
      return (
        <BlockDropdown { ...value } />
      );
    },
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}

const PortableTextBlocks = ({
  value,
}) => {
  if (!value) return null;
  return (
    <PortableText
      value={ value }
      components={ portableTextComponents }
    />
  );
}

export default PortableTextBlocks;