import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useRouter } from 'next/router';
import ShopSidebarCollectionGroup from './ShopSidebarCollectionGroup';
import Link from 'next/link';
import ShopSidebarSizes from './ShopSidebarSizes';
import ShopSidebarColors from './ShopSidebarColors';
import { useState } from 'react';

const ShopSidebarContent = () => {

  const { siteGlobals, windowHeight, } = useSiteGlobals();
  const [ categoryIsActive, setCategoryIsActive ] = useState(false);
  const router = useRouter();

  return (
    <div
      className='w-full h-full overflow-y-scroll lowercase'
      style={ {
        height: windowHeight - 64 + 'px',
      } }
    >
      <button className='w-full p-2 h-8 border-b border-b-black flex items-center justify-between' onClick={ () => setCategoryIsActive(!categoryIsActive) }>
        <h2 className='uppercase leading-[1em] text-left'>category</h2>
        <p>{ categoryIsActive ? '-' : '+' }</p>
      </button>
      {
        categoryIsActive &&
        <div className='w-full border-b border-b-black'>
          {
            siteGlobals?.shopSidebarData?.collections?.map((collection, index) => (
              <div key={ index } className='px-2 my-2'>
                {
                  collection?._type === 'collection' ?
                    <Link
                      href={ `/shop/${ collection.slug }` }
                      key={ index }
                      className={ `block w-full hover:font-bold uppercase ${ router.pathname === `/shop/[slug]` && router.asPath !== `/shop/${ collection.slug }` ? 'opacity-50' : router.pathname === `/shop/[slug]` && router.asPath === `/shop/${ collection.slug }` ? 'font-bold' : ''
                        }` }
                    >
                      { collection.title }
                    </Link>
                    :
                    <ShopSidebarCollectionGroup
                      key={ index }
                      collectionGroup={ collection }
                    />
                }
              </div>
            ))
          }
        </div>
      }
      <ShopSidebarSizes />
      <ShopSidebarColors />
    </div>
  )
};

export default ShopSidebarContent;