

/**
 * A client component that selects the appropriate country to display for products on a website
 */


export default function CountrySelect({ children, setActiveDropdown, activeDropdown, currentCountry }) {

  return (
    <button
      className="header__emoji header__emoji--currency"
      onClick={() => {
        if (activeDropdown === 'countries') {
          setActiveDropdown('');
        } else {
          setActiveDropdown('countries');
        }
      }}
      onMouseEnter={() => {
        setActiveDropdown('countries');
      }}
    >
      <span className="sr-only">active country: {currentCountry.name}</span>
      {children}
    </button>
  );
}