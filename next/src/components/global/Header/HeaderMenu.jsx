import HeaderEmojis from './HeaderEmojis';
import HeaderMenuItem from './HeaderMenuItem';
import HeaderMenuMobile from './HeaderMenuMobile';
import { AnimatePresence } from 'framer-motion';

const HeaderMenu = ({ sanityHeaderMenu, windowWidth, menuIsActive, setMenuIsActive, customerAccessToken }) => {

  return (
    <>
      {
        windowWidth >= 1024 && sanityHeaderMenu.items &&
        <div className="header__inner no-margins">
          {
            sanityHeaderMenu?.items.map(
              (item, index) => (
                <div className="header__col" key={index}>
                  <HeaderMenuItem item={item} windowWidth={windowWidth} />
                </div>
              )
            )
          }
          <HeaderEmojis isMobile={false} customerAccessToken={customerAccessToken} />
        </div>
      }
      {
        windowWidth < 1024 && sanityHeaderMenu?.items &&
        <div className="header__inner--mobile">
          <button
            className={`header__menu-button${menuIsActive === true ? ' active' : ''}`}
            onClick={() => setMenuIsActive && setMenuIsActive(!menuIsActive)}
            aria-label={`${menuIsActive === true ? 'close' : 'open'} main menu`}
          >
            <div className="header__menu-button__inner" />
          </button>
          <HeaderEmojis isMobile={true} customerAccessToken={customerAccessToken} />
        </div>
      }
      <AnimatePresence>
        {
          windowWidth < 1024 && menuIsActive === true && sanityHeaderMenu.items &&
          <HeaderMenuMobile sanityHeaderMenu={sanityHeaderMenu} setMenuIsActive={setMenuIsActive} />
        }
      </AnimatePresence>
    </>
  )
};

export default HeaderMenu;