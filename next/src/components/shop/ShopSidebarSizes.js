import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

const ShopSidebarSizes = () => {

  const searchParams = useSearchParams();
  const sizeQuery = searchParams.get('size');

  const { siteGlobals } = useSiteGlobals();
  const router = useRouter();

  const [ sizeIsActive, setSizeIsActive ] = useState(false);
  
  return (
    <div>
      <button className='w-full h-8 border-b border-b-black flex items-center justify-between p-2' onClick={ () => setSizeIsActive(!sizeIsActive) }>
        <h2 className='uppercase leading-[1em] text-left'>size</h2>
        <p>{ sizeIsActive ? '-' : '+' }</p>
      </button>
      {
        sizeIsActive &&
        <div className='w-full border-b border-b-black'>
          {
            siteGlobals?.shopSidebarData?.sizes?.map((size, index) => (
              <div key={ index } className='px-2 my-2'>
                <Link
                  href={ sizeQuery === size.title ?
                    { pathname: router.pathname, query: { ...router.query, size: undefined } }
                    :
                    { pathname: router.pathname, query: { ...router.query, size: size.title } }
                  }
                  key={ index }
                  className={ `block w-full ${ sizeQuery?.length > 0 && sizeQuery !== size.title ? ' opacity-50' : sizeQuery === size.title ? 'font-bold' : '' }` }
                >
                  { size.title }
                </Link>
              </div>
            ))
          }
        </div>
      }
    </div>
  );
};

export default ShopSidebarSizes;