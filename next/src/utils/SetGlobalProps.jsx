import { useEffect, } from 'react';
import { useSiteGlobals } from './SiteGlobalsContext';

const SetGlobalProps = (props) => {

  const { globalData } = props;
  const { siteGlobals, setSiteGlobals, isInitialised, setIsInitialised, setHoldingPage } = useSiteGlobals();

  useEffect(() => {
    if (globalData && isInitialised === false) {
      if (globalData?.settingsData?.teaserPage === true) {
        if (window.location.href.indexOf('https://normform-staging.vercel.app/') === -1 && window.location.href.indexOf('http://localhost:') === -1 && window.location.href.indexOf('https://normform2024.vercel.app') === -1) {
          setHoldingPage(true);
          setSiteGlobals({
            ...siteGlobals,
            ...globalData,
          });
        } else {
          setHoldingPage(false);
          setSiteGlobals({
            ...siteGlobals,
            ...globalData,
          });
        }
      } else {
        setSiteGlobals({
          ...siteGlobals,
          ...globalData,
        });
      }
      setIsInitialised(true);
    }
  }, [ globalData, setSiteGlobals, siteGlobals, isInitialised, setIsInitialised, setHoldingPage ]);

  return null;
};

export default SetGlobalProps;