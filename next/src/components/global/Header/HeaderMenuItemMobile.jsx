import { Fragment } from 'react';
import MenuLink from './MenuLink';

const HeaderMenuItemMobile = ({ item, setMenuIsActive } ) => {

  switch (item._type) {
    case 'dropdownMenuReference':
      return (
        <Fragment>
          {
            item.dropdown?.mainLink?.slug && item.dropdown?.mainLink?.title &&
            <MenuLink link={item.dropdown?.mainLink} setMenuIsActive={setMenuIsActive} mainItem={true} />
          }
          {
            item.dropdown?.items &&
            item.dropdown.items.map((dropdownItem, index) => (
              <MenuLink key={index} link={dropdownItem} setMenuIsActive={setMenuIsActive} />
            ))
          }
        </Fragment>
      )
    case 'linkInternal':
      return <MenuLink link={item} setMenuIsActive={setMenuIsActive} />
    case 'spacer':
      return <div className="header__menu--mobile__spacer" style={{ height: item?.height ? item.height * 25 + 'px' : 0 }} />
  
    default:
      return null;
  }
};

export default HeaderMenuItemMobile;