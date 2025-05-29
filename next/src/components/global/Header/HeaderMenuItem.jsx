import Dropdown from './Dropdown';
import MenuLink from './MenuLink';

const HeaderMenuItem = ({ item, windowWidth }) => {

  switch (item._type) {
    case 'dropdownMenuReference':
      return <Dropdown item={item} windowWidth={windowWidth} />
    case 'linkInternal':
      return <MenuLink link={item} />
  
    default:
      return null;
  }
};

export default HeaderMenuItem;