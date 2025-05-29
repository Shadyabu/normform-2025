import Link from 'next/link';
import { useMemo } from 'react';

const LinkInternal = ({ item, children, onClick, className }) => {

  const href = useMemo(() => {
    if (item?.documentType === 'privacyPolicy') {
      return '/privacy-policy';
    } else if (item?.documentType === 'home') {
      return '/';
    } else if (item?.documentType === 'info') {
      return '/info';
    } else if (item?.documentType === 'page') {
      return `/${ item?.slug }`;
    } else if (item?.documentType === 'cluster') {
      return `/${ item?.slug }`;
    } else if (item?.documentType === 'video') {
      return `/${ item?.slug }`;
    } else if (item?.documentType === 'playlist') {
      return `/${ item?.slug }`;
    }
  }, [ item ]);

  if (href) {
    return (
      <Link
        href={ href }
        onClick={ onClick }
        className={ className }
      >
        { children ?? item?.title ?? null }
      </Link>
    );
  } else {
    if (children) {
      return <span className={ className } onClick={ onClick }>{ children }</span>
    } else if (item?.title) {
      return <span className={ className } onClick={ onClick }>{ item.title }</span>
    } else {
      return null;
    }
  }
};

export default LinkInternal;