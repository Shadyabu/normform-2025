import ModernCart from '@/components/shop/ModernCart';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * A client component that shows a search input
 */

const Cart = () => {

  const { cartIsOpen, setCartIsOpen, windowWidth } = useSiteGlobals();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default values during SSR to prevent hydration mismatch
  const isDesktop = mounted && windowWidth >= 768;
  const cartWidth = isDesktop ? '320px' : '100vw';
  const cartLeft = isDesktop ? (windowWidth - 320) + 'px' : (cartIsOpen ? '0' : '100%');

  return (
    <>
      {mounted && (
        <AnimatePresence>
          {
            cartIsOpen &&
            <motion.button
              initial={ { opacity: 0 } }
              animate={ { opacity: 1 } }
              exit={ { opacity: 0 } }
              transition={ { duration: 0.5 } }
              aria-label='Close Cart'
              className='fixed top-0 left-0 w-screen h-screen z-[997] bg-black bg-opacity-50'
              onClick={ () => {
                setCartIsOpen(false);
              } }
            />
          }
        </AnimatePresence>
      )}
      <motion.nav
        key={ 'cart' }
        animate={ {
          x: cartIsOpen ? 0 : '100%',
        } }
        transition={ {
          style: 'ease-in-out',
        } }
        className='fixed pt-8 z-[998] h-screen left-0 sm-md:-mt-[1px] origin-top overflow-hidden sm:border-l sm:border-l-black bg-white'
        style={ {
          width: cartWidth,
          left: cartLeft,
        } }
      >
        <motion.div
          className='w-full h-full relative'
        >
          <div className='absolute w-full h-full block'>
            <ModernCart />
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}

export default Cart;
