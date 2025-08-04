import CookiesNotice from '@/components/CookiesNotice';
import Cart from '@/components/global/Cart';
import Header from '@/components/global/Header/Header';
import HoldingPage from '@/components/HoldingPage';
import SignUpForm from '@/components/SignUpForm';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useEffect, useState } from 'react';

const DynamicShopifyInit = dynamic(() => import('@/utils/ShopifyInit'), {
  ssr: false
});

const Layout = ({ children }) => {

  const router = useRouter();
  const { siteGlobals, menuIsActive, windowWidth, windowHeight, holdingPage } = useSiteGlobals();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const hScreenElements = document.querySelectorAll('.h-screen');
      for (let i = 0; i < hScreenElements.length; i++) {
        hScreenElements[ i ].style.height = `${ windowHeight }px`;
      }
    };

    if (windowHeight > 1) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ router.asPath, windowHeight ]);

  if (holdingPage === true) {
    return <HoldingPage />
  }

  // Use the same structure for both SSR and client-side rendering
  const contentKey = mounted ? (router.pathname.indexOf('/shop') > -1 ? 'shop' : router.pathname) : 'default';
  const contentOpacity = mounted ? (menuIsActive === false || windowWidth > 767 ? 1 : 0) : 1;

  return (
    <div className={ `w-screen h-screen` }>
      {
        siteGlobals?.settingsData?.gaMeasurementId &&
        <GoogleAnalytics trackPageViews gaMeasurementId={ siteGlobals.settingsData.gaMeasurementId } />
      }
      <div className='w-full h-full fixed top-0 left-0 z-[2]'> 
        <Header />
        <div style={{ opacity: contentOpacity }}>
          { children }
        </div>
        <Cart />
        <DynamicShopifyInit />
        <SignUpForm />
        <CookiesNotice />
      </div>
    </div>
  );
};

export default Layout;