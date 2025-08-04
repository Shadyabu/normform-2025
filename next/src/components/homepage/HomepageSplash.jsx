import { useState, useEffect } from 'react';
import LogoSceneCanvas from '../logo/LogoSceneCanvas';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const HomepageSceneCanvas = ({ homeData }) => {
  const [ backgroundImage, setBackgroundImage ] = useState(null);
  const [mounted, setMounted] = useState(false);

  const { windowWidth, windowHeight } = useSiteGlobals();
  
  useEffect(() => {
    setMounted(true);
    if (homeData?.splashPageBackgrounds && homeData?.splashPageBackgrounds.length > 0) {
      let randomImage = homeData.splashPageBackgrounds[ Math.floor(Math.random() * homeData.splashPageBackgrounds.length) ];
      if (randomImage) {
        setBackgroundImage({ ...randomImage });
      }
    }
  }, [ homeData ]);

  // Use default value during SSR to prevent hydration mismatch
  const objectPosition = mounted && windowWidth > 0 && windowHeight > 0 ? 
    (windowWidth > windowHeight ? 
      `${ backgroundImage?.hotspotDesktop?.x }% ${ backgroundImage?.hotspotDesktop?.y }%` : 
      `${ backgroundImage?.hotspotMobile?.x }% ${ backgroundImage?.hotspotMobile?.y }%`) : 
    'center center';

  return (
    <div className="w-screen h-screen relative">
      {
        backgroundImage?.url &&
        <img
          className="w-full h-full object-cover"
          src={ backgroundImage.url }
          alt={ backgroundImage.alt ?? '' }
          style={ {
            objectPosition: objectPosition
          } }
        />
      }
      <LogoSceneCanvas />
    </div>
  )
}

export default HomepageSceneCanvas;