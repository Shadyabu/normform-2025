import { fetchSync } from '@shopify/hydrogen';
import { useEffect } from 'react';

/**
 * A client component that selects the appropriate country to display for products on a website
 */

export default function Countries({ selectedCountry, setCountry, setDropdownIsLoaded, setActiveDropdown }) {
  const countries = fetchSync('/api/countries').json();

  useEffect(() => {
    setDropdownIsLoaded('countries');
  }, [setDropdownIsLoaded]);

  return (
    <div>
      {
        countries.map((country) => {
          const isSelected = country.isoCode === selectedCountry?.isoCode;
          return (
            <button
              key={country.isoCode}
              onClick={() => {
                setCountry && setCountry(country);
                setActiveDropdown('');
              }}
              className={`uc header__dropdown__button--country button--plain menu__link${isSelected === true ? ' selected' : ''}`}
            >{country.name}</button>
          );
        })
      }
    </div>
  );
}
