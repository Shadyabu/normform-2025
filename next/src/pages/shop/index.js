import ProductsGrid from '@/components/shop/ProductsGrid';
import ShopSidebar from '@/components/shop/ShopSidebar';
import { SHOP } from '@/fragments/pages/shop';
import client from '@/hooks/useSanityQuery';
import SetGlobalProps from '@/utils/SetGlobalProps';
import getGlobalProps from '@/utils/getGlobalProps';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useMemo, useState } from 'react';
import CreativeImageryBanner from '@/components/CreativeImageryBanner';
import { fetchShopifyData } from '@/utils/fetchShopifyData';
import Seo from '@/components/Seo';

const Shop = ({ globalData, shopData, shopifyData }) => {
  
  const products = useMemo(() => {
    if (shopifyData?.collection?.products?.edges?.length > 0) {
      return shopifyData.collection.products.edges.map((product) => product.node);
    }
    return [];
  }, [ shopifyData ]);

  const { windowWidth, windowHeight } = useSiteGlobals();

  const firstProducts = useMemo(() => {
    if (products?.length > 0) {
      return products.slice(0, 6);
    }
    return [];
  }, [ products ]);

  const nextProducts = useMemo(() => {
    if (products?.length > 6) {
      return products.slice(6);
    }
    return [];
  }, [ products ]);
  
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      className='w-screen h-full pt-8 fixed top-0 left-0 z-[1] overflow-y-scroll'
    >
      <Seo { ...{ ...shopData, globalData } } />
      <div className='pointer-events-none relative w-full z-[999]'>
        <div className='w-full sm:pl-[200px] max-sm:pt-8'>
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
        <div className='w-full pointer-events-all'>
          <Footer />
        </div>
      </div>
      <ShopSidebar />
      <SetGlobalProps { ...{ globalData } } />
    </motion.div>
  )
}

export async function getStaticProps() {
  const globalData = await getGlobalProps();
  const shopData = await client.fetch(SHOP);

  let shopifyData = null;

  if (shopData?.collection?.gid) {
    const SHOPIFY_QUERY = `
      {
        collection(id: "${ shopData.collection.gid }") {
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
      globalData,
      shopData,
      shopifyData,
    }
  };
}

export default Shop;