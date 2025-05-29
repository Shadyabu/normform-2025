const createLinkInternalSlug = (item) => {
  if (item?.documentType === 'privacy') {
    return '/privacy';
  } else if (item?.documentType === 'terms') {
    return '/terms';
  } else if (item?.documentType === 'home') {
    return '/';
  } else if (item?.documentType === 'about') {
    return '/about';
  } else if (item?.documentType === 'shop') {
    return '/shop';
  } else if (item?.documentType === 'collection') {
    return `/shop/${ item?.slug }`;
  } else if (item?.documentType === 'product') {
    return `/product/${ item?.slug }`;
  } else if (item?.documentType === 'page') {
    return `/page/${ item?.slug }`;
  } else {
    return '/';
  }
};

export default createLinkInternalSlug;