import { useState } from 'react';
import HeaderMenu from './HeaderMenu';
import LogoSceneCanvas from '../../logo/LogoSceneCanvas';
import WindowSizeDetector from '../../../utils/WindowSizeDetector';

const HeaderContent = ({ sanityHeaderMenu, sanityHomeSplashPage, customerAccessToken }) => {

  const [windowDimensions, setWindowDimensions] = useState({ windowWidth: 1, windowHeight: 1 });
  const [menuIsActive, setMenuIsActive] = useState(false);
  return (
    <>
      <WindowSizeDetector setWindowDimensions={setWindowDimensions} />
      {
        windowDimensions.windowWidth > -1 &&
        <>
          <header className="header">
            {
              sanityHeaderMenu &&
              <HeaderMenu
                sanityHeaderMenu={sanityHeaderMenu}
                {...windowDimensions}
                menuIsActive={menuIsActive}
                setMenuIsActive={setMenuIsActive}
                customerAccessToken={customerAccessToken}
              />
            }
          </header>
          {
            sanityHeaderMenu?.logo &&
            <LogoSceneCanvas
              logo={sanityHeaderMenu.logo}
              sanityHomeSplashPage={sanityHomeSplashPage}
              {...windowDimensions}
              menuIsActive={menuIsActive}
              setMenuIsActive={setMenuIsActive}
            />
          }
        </>
      }
    </>
  )
};

export default HeaderContent;