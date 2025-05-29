import { useEffect, useRef, useState } from 'react';
import MenuLink from './MenuLink';

export default function Dropdown({ item, windowWidth }) {
  const { dropdown } = item;
  const { mainLink, items } = dropdown;

  const [isActive, setIsActive] = useState(false);
  const menuHeader = useRef(null);
  const menuOuter = useRef(null);

  useEffect(() => {
    let timeout = setTimeout(() => { });
    if (items?.length > 0) {
      if (menuHeader.current && menuOuter.current?.style) {
        if (isActive === true) {
          menuOuter.current.style.height = menuHeader.current.offsetHeight * (items.length + 1) + 'px';
        } else {
          menuOuter.current.style.height = '31px';
        }
      }
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [ isActive, windowWidth, items?.length ]);

  return (
    <nav
      className={`header__menu__dropdown${isActive === true ? ' active' : ''}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onBlur={() => setIsActive(false)}
      ref={menuOuter}
    >
      <div className="header__menu__dropdown__inner">
        <div
          className="header__menu__dropdown__header"
          ref={ menuHeader }
        >
          {
            mainLink?.slug && mainLink?.title &&
            <MenuLink link={mainLink} />
          }
          {
            isActive === true &&
            <div className="header__menu__dropdown__items">
              {
                items &&
                items.map((dropdownItem, index) => (
                  <MenuLink key={index} link={dropdownItem} />
                ))
              }
            </div>
          }
        </div>
      </div>
    </nav>
  )
};