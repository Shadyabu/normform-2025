 'use client';

import { useRouter } from 'next/router';
import useWindowSize from '@/hooks/useWindowSize';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

export const SiteGlobalsContext = createContext({
  siteGlobals: {},
  setSiteGlobals: async (siteGlobals) => null,
  isInitialised: false,
  setIsInitialised: (isInitialised) => null,
  activeImageIndex: null,
  setActiveImageIndex: (activeImageIndex) => null,
  pageTitle: null,
  setPageTitle: (pageTitle) => null,
  backgroundType: null,
  setBackgroundType: (backgroundType) => null,
  menuIsActive: false,
  setMenuIsActive: (menuIsActive) => null,
  shopifyClient: null,
  setShopifyClient: (shopifyClient) => null,
  shopifyUI: null,
  setShopifyUI: (shopifyUI) => null,
  shopifyCart: null,
  setShopifyCart: (shopifyCart) => null,
  cartIsOpen: false,
  setCartIsOpen: (cartIsOpen) => null,
  cartNumber: 0,
  setCartNumber: (cartNumber) => null,
  holdingPage: false,
  setHoldingPage: (holdingPage) => null,
  footerHeight: 65,
  currency: { name: 'GBP', symbol: '£', country: 'United Kingdom' },
  setCurrency: (currency) => null,
  signupFormIsActive: true,
  setSignupFormIsActive: (signupFormIsActive) => null,
  shopifyStorefrontApiClient: null,
});

export const useSiteGlobals = () => useContext(SiteGlobalsContext)

export const SiteGlobalsProvider = ({ children }) => {

  const [ siteGlobals, setSiteGlobals ] = useState({});
  const [ isInitialised, setIsInitialised ] = useState(false);
  const [ activeImageIndex, setActiveImageIndex ] = useState(null);
  const [ pageTitle, setPageTitle ] = useState('');
  const [ backgroundType, setBackgroundType ] = useState('');
  const [ menuIsActive, setMenuIsActive ] = useState(false);
  const [ shopifyClient, setShopifyClient ] = useState(null);
  const [ shopifyUI, setShopifyUI ] = useState(null);
  const [ shopifyCart, setShopifyCart ] = useState(null);
  const [ cartIsOpen, setCartIsOpen ] = useState(false);
  const [ cartNumber, setCartNumber ] = useState(0);
  const [ holdingPage, setHoldingPage ] = useState(false);
  const { windowWidth, windowHeight } = useWindowSize();
  const [ currency, setCurrency ] = useState({ name: 'GBP', symbol: '£', country: 'United Kingdom', title: '£££', });
  const [ signupFormIsActive, setSignupFormIsActive ] = useState(true);

  const footerHeight = useMemo(() => {
    // Use default value during SSR to prevent hydration mismatch
    if (windowWidth === 0) return 65;
    if (windowWidth < 768) return 105;
    return 65;
  }, [ windowWidth ]);

  return (
    <SiteGlobalsContext.Provider
      value={ {
        siteGlobals, setSiteGlobals,
        isInitialised, setIsInitialised,
        activeImageIndex, setActiveImageIndex,
        pageTitle, setPageTitle,
        backgroundType, setBackgroundType,
        menuIsActive, setMenuIsActive,
        shopifyClient, setShopifyClient,
        shopifyUI, setShopifyUI,
        shopifyCart, setShopifyCart,
        cartIsOpen, setCartIsOpen,
        cartNumber, setCartNumber,
        holdingPage, setHoldingPage,
        footerHeight,
        windowWidth, windowHeight,
        currency, setCurrency,
        signupFormIsActive, setSignupFormIsActive,
      } }
    >{ children }</SiteGlobalsContext.Provider>
  );
}