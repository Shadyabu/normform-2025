import ShopifyCart from '@/components/shop/ShopifyCart';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A client component that shows a search input
 */

const HeaderDropdownCart = ({ activeDropdown }) => {

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

  useEffect(() => {
    let raf;

    const calculateInnerHeight = () => {
      if (inner.current) {
        setInnerHeight(inner.current.offsetHeight);
        setVariants({
          show: {
            height: inner.current.offsetHeight + 'px',
            borderColor: 'black',
            transition: {
              duration: 0.5,
              delay: 0,
              style: 'ease',
            }
          },
          hide: {
            height: 0,
            borderColor: 'transparent',
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
      animate={ activeDropdown === 'cart' ? 'show' : 'hide' }
      className='fixed top-8 z-[999] left-0 w-screen sm-md:left-[84vw] sm-md:w-[16vw] sm-md:-mt-[1px] origin-top overflow-hidden'
    >
      <motion.div
        className='w-full relative bg-white sm-md:border-l border-b border-black'
        style={ {
          height: 'calc(100% - 1px)',
        } }
      >
        <div
          ref={ inner }
          className='absolute w-full p-4 block'
        >
          <ShopifyCart />
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default HeaderDropdownCart;
