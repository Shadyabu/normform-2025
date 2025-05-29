'use client';

import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useMemo } from 'react';
import FooterColumn from './FooterColumn';

const Footer = () => {

  const { siteGlobals } = useSiteGlobals();
  const footerColumns = useMemo(() => {
    if (!siteGlobals?.settingsData?.footerLinks) {
      return [];
    }
    const columns = siteGlobals?.settingsData?.footerLinks;
    return columns;
  }, [ siteGlobals ]);

  return (
    <footer className='pt-2 top-0 left-0 w-full z-[999] grid grid-cols-1 sm:grid-cols-4 gap-2 pb-12 p-2 border-t border-black bg-white max-sm:text-sm relative'>
      {
        footerColumns.map((column, index) => (
          <FooterColumn key={ index } { ...{ column, index } } />
        ))
      }
      <p className='absolute bottom-2 left-2 text-xs'>Website by <a href='https://rif.ke' target='_blank' rel='noopener noreferrer'>rif.ke</a></p>
    </footer>
  )
};

export default Footer;