import Link from 'next/link'
import { useRouter } from 'next/router';


const MenuLinkInternal = ({ link, currentText, handleMouseEnter, handleMouseLeave, handleBlur, setMenuIsActive, mainItem }) => {

  const { documentType } = link;
  const { slug } = link;

  const router = useRouter();

  if (documentType && slug) {
    return (
      <Link
        className={`uc menu__link${mainItem === true ? ' menu__link--main' : ''} ${router.location.pathname === `${slug}` ? 'no-hover' : 'opacity-50 mouse:hover:opacity-100'}`}
        to={slug}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onBlur={handleBlur}
        onClick={() => setMenuIsActive && setMenuIsActive(false)}
      >
        {currentText}
      </Link>
    );
  } else {
    return null;
  }
};

export default MenuLinkInternal;