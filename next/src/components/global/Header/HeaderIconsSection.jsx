import { useEffect, useState } from 'react';
import HeaderIcon from './HeaderIcon';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import HeaderIconCart from './HeaderIconCart';

const HeaderIconsSection = ({ activeDropdown, setActiveDropdown }) => {

  const { setCartIsOpen } = useSiteGlobals();
  const [ items ] = useState([
    // { name: 'currency', src: 'money-with-wings', alt: 'Money with wings' },
    { name: 'search', src: 'magnifying-glass-tilted-left', alt: 'Magnifying Glass Tilted Left' },
    { name: 'account', src: 'bust-in-silhouette', alt: 'Bust of a person in silhouette' },
  ]);

  useEffect(() => {
    if (activeDropdown === 'cart') {
      setCartIsOpen(true);
    } else {
      setCartIsOpen(false);
    }
  }, [ activeDropdown, setCartIsOpen ]);

  return (
    <div className='col-[3_/_span_1] xs:col-[4_/_span_1] sm-md:col-[6_/_span_1] flex items-center justify-end gap-4 px-3'>
      {
        items.map((item, index) => (
          <HeaderIcon { ...{ activeDropdown, setActiveDropdown, item } } key={ index } />
        ))
      }
      <HeaderIconCart
        { ...{
          item: { name: 'cart', src: 'shopping-cart', alt: 'Shopping Cart' },
          activeDropdown, setActiveDropdown,
        } }
      />
    </div>
  )
}

export default HeaderIconsSection;