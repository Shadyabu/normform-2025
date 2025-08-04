import { PRODUCT } from '@/fragments/pages/product';
import client from '@/hooks/useSanityQuery';
import SetGlobalProps from '@/utils/SetGlobalProps';
import getGlobalProps from '@/utils/getGlobalProps';
import groq from 'groq';
import { motion } from 'framer-motion';
import ProductContent from '@/components/shop/ProductContent';
import CreativeImageryBanner from '@/components/CreativeImageryBanner';
import Footer from '@/components/Footer';
import { fetchShopifyData } from '@/utils/fetchShopifyData';
import ProductsGrid from '@/components/shop/ProductsGrid';
import Seo from '@/components/Seo';

export default function Product({ data, productData, styleWithData, globalData }) {
console.log('productData',productData)
console.log('data',data)
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      className='w-screen h-screen fixed top-0 left-0 z-[1] overflow-y-scroll'
    >
      <Seo { ...{ ...productData, globalData } } />
      <div>
        <ProductContent product={ productData } shopify={ data } />
      </div>
      {
        (productData?.creativeImagery?.length > 0 || globalData?.settingsData?.creativeImagery?.length > 0) &&
        <div className='w-full'>
          <CreativeImageryBanner creativeImagery={ productData?.creativeImagery?.length > 0 ? productData?.creativeImagery : globalData.settingsData.creativeImagery } />
        </div>
      }
      {
        styleWithData?.length > 0 &&
        <div>
          <h2 className='text-center px-2 border-b border-b-black'>Style With</h2>
          <ProductsGrid products={ styleWithData } />
        </div>
      }
      <Footer />
      <SetGlobalProps { ...{ globalData } } />
    </motion.div>
  )
}

export async function getStaticPaths(context) {
  const products = await client.fetch(groq`*[_type == 'product'][] {
    "slug": store.slug.current,
  }`, {});

  let paths = [];
  if (products?.length > 0) {
    for (const product of products) {
      if (product?.slug) {
        paths.push({
          params: {
            slug: product.slug,
          },
        });
      }
    }
  }

  const isHoldingPage = await client.fetch(groq`*[_type == 'settings'][0].holdingPage`);
  if (isHoldingPage === true && process.env.FULL_SITE !== 'true') {
    return { paths: [], fallback: 'blocking' };
  } else {
    return { paths, fallback: false };
  }
}

export async function getStaticProps(context) {

  let productData = null;

  if (context?.params?.slug) {
    productData = await client.fetch(PRODUCT, { slug: context.params.slug });
  } else {
    productData = {
      title: 'Page not found',
      _type: '404',
    };
  }

  const PRODUCT_QUERY = `
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        images(first: 24) {
          edges {
            node {
              src
              altText
            }
          }
        }
      }
    }
  `;

  const data = await fetchShopifyData(PRODUCT_QUERY, { handle: `${ context.params.slug }` });

  // Transform Shopify variants to match the expected format
  if (data?.product?.variants?.edges) {
    const transformedVariants = data.product.variants.edges.map(edge => {
      const variant = edge.node;
      const options = {};
      variant.selectedOptions.forEach(option => {
        const optionName = option.name.toLowerCase();
        options[optionName] = option.value;
      });
      
      return {
        id: variant.id,
        gid: variant.id, // Shopify Global ID
        title: variant.title,
        option1: options.color || options.colour || options.colors || '',
        option2: options.size || '',
        option3: '',
        quantityAvailable: null, // Not available in public API
        price: parseFloat(variant.price.amount),
        isAvailable: variant.availableForSale,
      };
    });
    
    // Add transformed variants to productData
    if (productData) {
      productData.variants = transformedVariants;
    }
  }

  const styleWithData = [];
  
  if (productData?.styleWith?.length > 0) {
    for (const styleWith of productData.styleWith) {
      const product = await fetchShopifyData(PRODUCT_QUERY, { handle: `${ styleWith.slug }`, });
      styleWithData.push(product?.product);
    }
  }

  const globalData = await getGlobalProps();

  return {
    props: {
      data: data?.product,
      productData,
      styleWithData,
      globalData,
    },
  }
}