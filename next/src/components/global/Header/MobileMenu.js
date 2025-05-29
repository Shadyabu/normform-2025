import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MobileMenu = ({ setActiveDropdown }) => {

  const { setMenuIsActive } = useSiteGlobals();
  const router = useRouter();

  const closeMenu = () => {
    setMenuIsActive(false);
    setActiveDropdown(null);
  }

  return (
    <div>
      <div className='col-span-1 h-full justify-start items-center'>
        <Link
          href='/'
          className={ `uppercase block px-2 py-1 mouse:hover:bold opacity-50 mouse:hover:opacity-100 transition-opacity duration-300` }
          style={ {
            opacity: router.pathname === '/' ? 1 : undefined,
            fontWeight: router.pathname === '/' ? '700' : undefined,
          } }
          onClick={ closeMenu }
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
          onClick={ closeMenu }
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
          onClick={ closeMenu }
        >About</Link>
      </div>
    </div>
  );
};

export default MobileMenu;