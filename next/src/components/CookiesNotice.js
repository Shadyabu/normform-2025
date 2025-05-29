import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import PortableTextBlocks from '@/components/blocks/PortableTextBlocks';
import Link from 'next/link';

const CookiesNotice = () => {

  const [ cookiesAreAccepted, setCookiesAreAccepted ] = useState(getCookieConsentValue() ? true : false);
  const handleAcceptCookies = () => {
    setCookiesAreAccepted(true);
  }

  const { siteGlobals } = useSiteGlobals();
  
  if (cookiesAreAccepted !== true) {
    return (
      <motion.div
        initial={ { y: 0 } }
        animate={ { y: 0 } }
        exit={ { y: '100%' } }
        transition={ { style: 'linear' } }
        className='fixed bottom-0 left-0 w-full z-[9999] bg-white border-t border-black'
      >
        <CookieConsent
          containerClasses='cookies-notice p-5'
          location='none'
          buttonText='I accept'
          disableButtonStyles
          acceptOnScroll={ true }
          hideOnAccept={ false }
          disableStyles
          buttonClasses='text-white bg-black border border-black px-4 h-8 mt-2 mr-2 text-body rounded-[100px] mouse:hover:text-black mouse:hover:bg-white transition-bg transition-text duration-200'
          buttonWrapperClasses='cookies-notice__options'
          onAccept={ handleAcceptCookies }
        >
          {
            siteGlobals?.settingsData?.cookieConsentText?.length > 0 ?
              <span className='block block'>{ siteGlobals.settingsData.cookieConsentText }</span>
              :
            <span className='block antialiased text-title'>By using this site you consent to the use of cookies.</span>
          }
          <span className='block antialiased'>For more info, please read our <Link className='underline' href='/privacy'>Privacy Policy</Link></span>
        </CookieConsent>
      </motion.div>
    );
  } else {
    return null;
  }
}

export default CookiesNotice;