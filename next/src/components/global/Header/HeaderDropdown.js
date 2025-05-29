import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import HeaderDropdownCurrency from './HeaderDropdownCurrency';
import HeaderDropdownSearch from './HeaderDropdownSearch';
import HeaderDropdownAccount from './HeaderDropdownAccount';
import MobileMenu from './MobileMenu';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const HeaderDropdown = ({ activeDropdown, setActiveDropdown }) => {

  const { menuIsActive, windowWidth } = useSiteGlobals();
  const inner = useRef();

  const [ innerHeight, setInnerHeight ] = useState(0);
  const [ variants, setVariants ] = useState({
    show: {
      height: 1,
      transition: {
        duration: 0.5,
        delay: 0,
        style: 'ease',
      }
    },
    hide: {
      height: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        style: 'ease',
      }
    }
  });

  const childVariants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      }
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0,
      }
    }
  }

  useEffect(() => {
    let raf;

    const calculateInnerHeight = () => {
      if (inner.current) {
        setInnerHeight(inner.current.offsetHeight);
        setVariants({
          show: {
            height: inner.current.offsetHeight + 'px',
            transition: {
              duration: 0.5,
              delay: 0,
              style: 'ease',
            }
          },
          hide: {
            height: 0,
            transition: {
              duration: 0.5,
              delay: 0.5,
              style: 'ease',
            }
          }
        });
      } else {
        raf = requestAnimationFrame(calculateInnerHeight);
      }
    };

    calculateInnerHeight();
    window.addEventListener('resize', calculateInnerHeight);

    return () => {
      window.removeEventListener('resize', calculateInnerHeight);
      cancelAnimationFrame(raf);
    }
  }, [ activeDropdown ]);

  return (
    <motion.nav
      variants={ variants }
      initial='hide'
      animate='show'
      exit='hide'
      className='fixed top-8 z-[999] left-0 w-screen sm-md:left-[84vw] sm-md:w-[16vw] bg-white sm-md:border-l border-b border-black  sm-md:-mt-[1px] origin-top overflow-hidden'
    >
      <motion.div
        className='w-full relative'
        variants={ childVariants }
        style={ {
          height: innerHeight + 'px',
        } }
      >
        <div
          ref={ inner }
          className='absolute w-full block'
        >
          {/* {
            activeDropdown === 'currency' &&
            <HeaderDropdownCurrency />
          } */}
          {
            activeDropdown === 'search' &&
            <HeaderDropdownSearch />
          }
          {
            activeDropdown === 'account' &&
            <HeaderDropdownAccount />
          }
          {
            activeDropdown === 'menu' &&
            // menuIsActive &&
            // windowWidth < 768 &&
            <MobileMenu { ...{ setActiveDropdown } } />
          }
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default HeaderDropdown;