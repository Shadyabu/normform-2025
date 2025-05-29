import { useState, useEffect } from 'react';
import LogoSceneCanvas from '../logo/LogoSceneCanvas';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const HomepageSceneCanvas = ({ homeData }) => {
  const [ backgroundImage, setBackgroundImage ] = useState(null);

  const { windowWidth, windowHeight } = useSiteGlobals();
  
  useEffect(() => {
    if (homeData?.splashPageBackgrounds && homeData?.splashPageBackgrounds.length > 0) {
      let randomImage = homeData.splashPageBackgrounds[ Math.floor(Math.random() * homeData.splashPageBackgrounds.length) ];
      if (randomImage) {
        setBackgroundImage({ ...randomImage });
      }
    }
  }, [ homeData ]);



  return (
    <div className="w-screen h-screen relative">
      {
        backgroundImage?.url &&
        <img
          className="w-full h-full object-cover"
          src={ backgroundImage.url }
          alt={ backgroundImage.alt ?? '' }
          style={ {
            objectPosition: windowWidth > windowHeight ? `${ backgroundImage?.hotspotDesktop?.x }% ${ backgroundImage?.hotspotDesktop?.y }%` : `${ backgroundImage?.hotspotMobile?.x }% ${ backgroundImage?.hotspotMobile?.y }%`
          } }
        />
      }
      <LogoSceneCanvas />
    </div>
  )
}

export default HomepageSceneCanvas;