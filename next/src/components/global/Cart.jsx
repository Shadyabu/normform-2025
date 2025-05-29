import ShopifyCart from '@/components/shop/ShopifyCart';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * A client component that shows a search input
 */

const Cart = () => {

  const { cartIsOpen, setCartIsOpen, windowWidth } = useSiteGlobals();

  return (
    <>
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
          width: windowWidth >= 768 ? '320px' : '100vw',
          left: windowWidth >= 768 ? windowWidth - 320 + 'px' : cartIsOpen ? '0' : '100%',
        } }
      >
        <motion.div
          className='w-full h-full relative'
        >
          <div className='absolute w-full h-full block'>
            <ShopifyCart />
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}

export default Cart;
