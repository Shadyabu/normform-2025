import MenuLinkInternal from './MenuLinkInternal';

const MenuLink = ({ link, setMenuIsActive, mainItem } ) => {

  const { _type, title } = link;

  if (_type === 'linkExternal') {
    if (link.url) {
      return (
        <a
          className={`uc menu__link${mainItem === true ? ' menu__link--main' : ''}`}
          href={link.url}
          rel="noreferrer"
          target="_blank"
          onClick={() => setMenuIsActive && setMenuIsActive(false)}
        >
          {title}
        </a>
      );
    } else {
      return null;
    }
  } else if (_type === 'linkInternal') {
    return (
      <MenuLinkInternal
        link={link}
        mainItem={mainItem}
        currentText={title}
        setMenuIsActive={setMenuIsActive}
      />
    );
  } else {
    return null;
  }
};

export default MenuLink;