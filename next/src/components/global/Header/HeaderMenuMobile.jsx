import { motion } from 'framer-motion';
import HeaderMenuItemMobile from './HeaderMenuItemMobile';

const HeaderMenuMobile = (props) => {
  const { windowWidth, sanityHeaderMenu, setMenuIsActive } = props;

  return (
    <motion.nav
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{
        style: 'ease'
      }}
      className="header__menu--mobile"
    >
      {
        sanityHeaderMenu?.mobileItems?.map(
          (item, index) => (
            <HeaderMenuItemMobile item={item} key={index} setMenuIsActive={setMenuIsActive} />
          )
        )
      }
    </motion.nav>
  )
};

export default HeaderMenuMobile;