import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

const ShopSidebarCollectionGroup = ({ collectionGroup }) => {

  const router = useRouter();

  const [ isActive, setIsActive ] = useState(false);

  const slugs = useMemo(() => {
    const collectionSlugs = [];
    for (let collection of collectionGroup?.collections) {
      collectionSlugs.push(collection.slug);
    }
    if (collectionGroup.titleCollection?.slug) {
      collectionSlugs.push(collectionGroup.titleCollection.slug);
    }
    return collectionSlugs;
  }, [ collectionGroup ]);

  if (!collectionGroup?.collections) {
    return null;
  }

  return (
    <div className='w-full'>
      <h3>
        <span
          className={ `flex items-center justify-between w-full uppercase ${ isActive ? '' : '' }` }
          style={ {
            opacity: router.pathname === '/shop/[slug]' && !slugs.includes(router.query.slug) ? 0.5 : 1,
            fontWeight: router.pathname === '/shop/[slug]' && slugs.includes(router.query.slug) ? '700' : undefined,
          } }
        >
          {
            collectionGroup?.titleCollection?.slug ?
              <Link className='block uppercase' href={ `/shop/${ collectionGroup?.titleCollection?.slug }` }>{ collectionGroup.title }</Link>
              :
              <button
                onClick={ () => setIsActive(!isActive) }
                className='block uppercase'
              >{ collectionGroup.title }</button>
          }
          <button
            className='block'
            onClick={ () => setIsActive(!isActive) }
          >{ isActive ? '-' : '+' }</button>
        </span>
      </h3>
      {
        isActive &&
        <div className='w-full'>
          {
            collectionGroup.collections?.map((collection, index) => (
              <Link
                href={ `/shop/${ collection.slug }` }
                key={ index }
                className={ `block pl-4${ router.pathname === '/shop/[slug]' && router.asPath !== `/shop/${ collection.slug }` ? ' opacity-50' : '' }` }
              >
                <p
                  style={ {
                    fontWeight: router.pathname === '/shop/[slug]' && router.asPath === `/shop/${ collection.slug }` ? '700' : undefined,
                  } }
                >{ collection.title }</p>
              </Link>
            ))
          }
        </div>
      }
    </div>
  );
};

export default ShopSidebarCollectionGroup;