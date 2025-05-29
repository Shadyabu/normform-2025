import { useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import ShopSidebarContent from './ShopSidebarContent';
import { AnimatePresence, motion } from 'framer-motion';

const ShopSidebar = () => {

  const { windowWidth, windowHeight } = useSiteGlobals();

  const [ shopSidebarIsActive, setShopSidebarIsActive ] = useState(false);

  if (windowWidth < 768) {
    return (
      <>
        <button
          className='fixed top-8 h-8 bg-white w-full z-[1001] border-b border-b-black'
          onClick={ () => setShopSidebarIsActive(!shopSidebarIsActive) }
          aria-label='Toggle shop sidebar'
        >{ !shopSidebarIsActive ? 'open' : 'close' } filters</button>
        <AnimatePresence>
          {
            shopSidebarIsActive &&
            <motion.div
              initial={ { y: -windowHeight } }
              animate={ { y: 0 } }
              exit={ { y: -windowHeight } }
              transition={ { duration: 0.5, style: 'linear' } }
              className='w-full h-full fixed top-16 left-0 bg-white z-[1000]'
              style={ {
                height: windowHeight - 64 + 'px',
              } }
            >
              <div>
                <ShopSidebarContent />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </>
    );
  } else {
    return (
      <div className='w-[200px] h-full fixed top-8 left-0 bg-white z-[996] border-r border-r-black overflow-y-scroll'>
        <div>
          <ShopSidebarContent />
        </div>
      </div>
    );
  }
};

export default ShopSidebar;