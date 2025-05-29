import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useState } from 'react';

const HeaderDropdownCurrency = () => {

  const { currency, setCurrency } = useSiteGlobals();
  const [ currencies ] = useState([
    { name: 'GBP', symbol: '£', country: 'United Kingdom', title: '£££', },
    { name: 'USD', symbol: '$', country: 'United States', title: '$$$', },
    { name: 'EUR', symbol: '€', country: 'Europe', title: '€€€', },
  ]);

  return (
    <div className='p-2'>
      {
        currencies?.map((currencyItem) => (
          <button
            key={ currencyItem.country }
            className={ `${ currency.symbol === currencyItem.symbol ? ' font-bold' : 'opacity-50' } block` }
            onClick={ () => setCurrency(currencyItem) }
          >{ currencyItem.title }</button>
        ))
      }
    </div>
  );
}

export default HeaderDropdownCurrency;