import Link from 'next/link';
import { useRouter } from 'next/router';
import HeaderIconsSection from './HeaderIconsSection';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeaderDropdown from './HeaderDropdown';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import MenuButton from './MenuButton';

const Header = () => {
  const { windowWidth } = useSiteGlobals();
  const router = useRouter();
  const [ activeDropdown, setActiveDropdown ] = useState(null);

  useEffect(() => {
    if (windowWidth >= 1024) {
      setActiveDropdown(null);
    }
  }, [ windowWidth ]);

  return (
    <>
      <header className='fixed z-[999] top-0 left-0 w-screen bg-white grid grid-cols-3 xs:grid-cols-4 sm-md:grid-cols-6 h-8 border-b border-b-black'>
        <h1 className='hidden'>Normform</h1>
        {
          windowWidth >= 1024 ?
          <>
            <div className='col-span-1 h-full justify-start items-center'>
              <Link
                href='/'
                className={ `uppercase block px-2 py-1 mouse:hover:bold opacity-50 mouse:hover:opacity-100 transition-opacity duration-300` }
                style={ {
                  opacity: router.pathname === '/' ? 1 : undefined,
                  fontWeight: router.pathname === '/' ? '700' : undefined,
                } }
              >Home</Link>
            </div>
            <div className='col-span-1 h-full justify-start items-center'>
              <Link
                href='/shop'
                className={ `uppercase block px-2 py-1 mouse:hover:bold opacity-50 mouse:hover:opacity-100 transition-opacity duration-300` }
                style={ {
                  opacity: router.pathname === '/shop' ? 1 : undefined,
                  fontWeight: router.pathname === '/shop' ? '700' : undefined,
                } }
              >Shop</Link>
            </div>
            <div className='col-span-1 h-full justify-start items-center'>
              <Link
                href='/about'
                className={ `uppercase block px-2 py-1 mouse:hover:bold opacity-50 mouse:hover:opacity-100 transition-opacity duration-300` }
                style={ {
                  opacity: router.pathname === '/about' ? 1 : undefined,
                  fontWeight: router.pathname === '/about' ? '700' : undefined,
                } }
              >About</Link>
            </div>
          </>
          :
          <div className='col-span-1 h-8 flex justify-start items-center px-2'>
            <MenuButton { ...{ activeDropdown, setActiveDropdown } } />
          </div>
        }
        <HeaderIconsSection { ...{ activeDropdown, setActiveDropdown } } />
      </header>
      <AnimatePresence mode='wait'>
        {
          activeDropdown &&
          activeDropdown !== 'cart' &&
          <HeaderDropdown { ...{ activeDropdown, setActiveDropdown } } key={ activeDropdown } />
        }
      </AnimatePresence>
    </>
  )
};

export default Header;