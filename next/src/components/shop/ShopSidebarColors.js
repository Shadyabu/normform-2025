import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

const ShopSidebarColors = () => {

  const searchParams = useSearchParams();
  const colorQuery = searchParams.get('color');

  const { siteGlobals } = useSiteGlobals();
  const router = useRouter();
  const [ colorIsActive, setColorIsActive ] = useState(false);

  console.log(siteGlobals?.shopSidebarData)
  
  return (
    <div>
      <button className='w-full p-2 h-8 border-b border-b-black flex items-center justify-between' onClick={ () => setColorIsActive(!colorIsActive) }>
        <h2 className='uppercase leading-[1em] text-left'>colour</h2>
        <p>{ colorIsActive ? '-' : '+' }</p>
      </button>
      {
        colorIsActive &&
        <div className='w-full border-b border-b-black'>
          {
            siteGlobals?.shopSidebarData?.colors?.map((color, index) => (
              <div key={ index } className='px-2 my-2'>
                <Link
                  href={ colorQuery === color.title ?
                    { pathname: router.pathname, query: { ...router.query, color: undefined } }
                    :
                    { pathname: router.pathname, query: { ...router.query, color: color.title } }
                  }
                  key={ index }
                  className={ `flex items-center justify-between w-full group` }
                >
                  <span className={ `${ colorQuery?.length > 0 && colorQuery !== color.title ? ' opacity-50' : colorQuery === color.title ? 'font-bold' : '' }` }>{ color.title }</span>
                  <span
                    className={ `block w-4 h-4 border-black rounded-[100px] ${ colorQuery === color.title ? 'rotate-45 rounded-[0]' : 'mouse:group-hover:rotate-45 mouse:group-hover:rounded-[0]' } border border-black transition-rounded transition-transform duration-300` }
                    style={ { backgroundColor: color.color?.hex } }
                  />
                </Link>
              </div>
            ))
          }
        </div>
      }
    </div>
  );
};

export default ShopSidebarColors;