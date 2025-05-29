import { COLLECTION } from '@/fragments/pages/collection';
import client from '@/hooks/useSanityQuery';
import SetGlobalProps from '@/utils/SetGlobalProps';
import getGlobalProps from '@/utils/getGlobalProps';
import groq from 'groq';
import { motion } from 'framer-motion';
import ShopSidebar from '@/components/shop/ShopSidebar';
import ProductsGrid from '@/components/shop/ProductsGrid';
import Footer from '@/components/Footer';
import { fetchShopifyData } from '@/utils/fetchShopifyData';
import { IMAGE } from '@/fragments/components/image';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useMemo } from 'react';
import CreativeImageryBanner from '@/components/CreativeImageryBanner';
import Seo from '@/components/Seo';

export default function Collection({ globalData, shopifyData, shopData }) {
  
  const products = useMemo(() => {
    if (shopifyData?.collection?.products?.edges?.length > 0) {
      return shopifyData.collection.products.edges.map((product) => product.node);
    }
    return [];
  }, [ shopifyData ]);

  const { windowWidth, windowHeight } = useSiteGlobals();

  const firstProducts = useMemo(() => {
    if (products?.length > 0) {
      if (windowWidth >= 768) {
        return products.slice(0, 6);
      } else {
        return products.slice(0, 2);
      }
    }
    return [];
  }, [ products, windowWidth ]);

  const nextProducts = useMemo(() => {
    // if (windowWidth >= 768) {
      if (products?.length > 6) {
        return products.slice(6);
      } else {
        return [];
      }
  }, [ products, windowWidth ]);

  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      className='w-screen h-full pt-8 fixed top-0 left-0 z-[1] overflow-y-scroll'
    >
      <Seo { ...{ ...shopData, globalData } } />
      <ShopSidebar />
      <div className='pointer-events-none relative w-full z-[999]'>
        <div className='w-full sm:pl-[200px]'>
          <div className='w-full h-auto min-h-screen pointer-events-all'>
            {
              products?.length > 0 &&
              <ProductsGrid products={ firstProducts } />
            }
            {
              shopData?.creativeImagery?.length > 0 &&
              <CreativeImageryBanner creativeImagery={ shopData.creativeImagery } height={ windowWidth >= 768 ? windowHeight + 'px' : windowHeight * 1.6 + 'px' } />
            }
            {
              products?.length > 0 &&
              <ProductsGrid products={ nextProducts } />
            }
          </div>
        </div>
        <div className='w-full pointer-events-all relative z-[999]'>
          <Footer />
        </div>
      </div>
      <SetGlobalProps { ...{ globalData } } />
    </motion.div>
  )
}

export async function getStaticPaths(context) {
  const collections = await client.fetch(groq`*[_type == 'collection'][] {
    "slug": store.slug.current,
  }`, {});

  let paths = [];
  if (collections?.length > 0) {
    paths = collections.map((collection) => ({
      params: {
        slug: collection.slug,
      },
    }));
  }

  return { paths, fallback: false };
}

export async function getStaticProps(context) {

  let collectionData = null;

  if (context?.params?.slug) {
    collectionData = await client.fetch(COLLECTION, { slug: context.params.slug });
  } else {
    collectionData = {
      title: 'Page not found',
      _type: '404',
    };
  }

  const globalData = await getGlobalProps();

  const shopQuery = groq`*[_type == 'shop'][0]{
    creativeImagery[] {
      ${IMAGE}
    }
  }`;

  const shopData = await client.fetch(shopQuery);

  let shopifyData = null;

  if (collectionData?.store?.gid) {
    const SHOPIFY_QUERY = `
      {
        collection(id: "${ collectionData.store.gid }") {
          title
          products(first: 100) {
            edges {
              node {
                handle
                id
                title
                description
                options {
                  name
                  values
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 2) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    shopifyData = await fetchShopifyData(SHOPIFY_QUERY);
  }

  return {
    props: {
      collectionData,
      shopifyData,
      globalData,
      shopData,
    },
  }
}