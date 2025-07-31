
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import ProductSlideshow from './ProductSlideshow';
import { AnimatePresence, motion } from 'framer-motion';
import PortableTextBlocks from '../blocks/PortableTextBlocks';
import SizingChart from './SizingChart';



const DynamicBuyNow = dynamic(() => import('./BuyNowButton'), {
  ssr: false
});

const ProductContent = (props) => {

  const { product, shopify } = props;
  const { shopifyId } = product;
  const [ imageIsLoaded, setImageIsLoaded ] = useState(false);
  const { windowWidth, currency, siteGlobals } = useSiteGlobals();

  const [ activeSection, setActiveSection ] = useState('description');
  
  useEffect(() => {
    const img = document.createElement('img');
    img.onload = () => {
      setImageIsLoaded(true);
    };
    img.src = product?.previewImageUrl;
  }, [ product ]);
  
  return (
    <div className='w-full sm:grid sm:grid-cols-2 pt-8 min-h-screen'>
      <div className='col-span-1'>
        <ProductSlideshow { ...{ shopify } } />
      </div>
      <div className='col-span-1 min-h-full sm:border-l border-l-black'>
        <div className='w-full border-b border-black w-full'>
          <h2 className='text-center'>{ product.title }</h2>
        </div>
        <div className='w-full border-b border-black w-full'>
          <p className='text-center'>{ currency.symbol }{ product.price }</p>
        </div>
        <div className=''>
          <DynamicBuyNow { ...{ shopifyId, product, } } key={ shopifyId } />
        </div>
        <div className='w-full sm:flex items-center border-y border-black'>
          {
            [ 'description', 'sizing', 'responsibility' ].map((section, index) => (
              <button
                key={ index }
                className={ `w-full sm:w-1/3 px-2 text-center max-sm:border-b sm:border-r last:border-b-0 border-black last:border-r-0 transition-colors duration-200 hover:bg-black hover:text-white hover-button ${ activeSection === section ? 'bg-black text-white' : 'bg-white text-black' }` }
                onClick={ () => setActiveSection(section) }
              >
                { section }
              </button>
            ))
          }
        </div>
        {
          shopifyId &&
          <div className='md:flex max-md:order-2 md:w-full md:w-1/4 md:justify-start md:items-end'>
            <div className='w-full mx-auto top-0 left-0 md:max-h-full'>
              <div className='w-full'>
                <div
                  className='md:overflow-y-scroll w-full'
                  style={ {
                    WebkitMaskImage: windowWidth >= 1200 ? 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 6px)' : 'none',
                    maskImage: windowWidth >= 1200 ? 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 6px)' : 'none',
                  } }
                >
                  <AnimatePresence mode='wait'>
                    {
                      activeSection === 'description' &&
                      (product.store?.descriptionHtml?.length > 0 || product?.descriptionSections?.length > 0) &&
                      <motion.div
                        initial={ { opacity: 0 } }
                        animate={ { opacity: 1 } }
                        exit={ { opacity: 0 } }
                        key={ 'description' }
                        className='px-2 py-2 w-full min-h-8'
                      >
                        {
                          product?.descriptionSections?.length > 0 ?
                            <div className=''>
                              {
                                product.descriptionSections.map((section, index) => (
                                  <div key={ index } className='w-full grid grid-cols-6 gap-2 mb-4'>
                                    <h3 className='col-span-2 sm:col-span-1 uppercase'>{ section.title }</h3>
                                    <p className='col-span-4 sm:col-span-5 whitespace-pre-line'>{ section.content }</p>
                                  </div>
                                ))
                              }
                            </div>
                            :
                            <div className='rich-text'>
                              { parse(product.store.descriptionHtml) }
                            </div>
                        }
                      </motion.div>
                    }
                    {
                      activeSection === 'sizing' &&
                      <motion.div
                        initial={ { opacity: 0 } }
                        animate={ { opacity: 1 } }
                        exit={ { opacity: 0 } }
                        key={ 'sizing' }
                        className='w-full p-2'
                      >
                        {
                          product?.sizing?.length > 0 &&
                          <PortableTextBlocks value={ product.sizing } />
                        }     
                      </motion.div>
                    }
                    {
                      activeSection === 'responsibility' &&
                      <motion.div
                        initial={ { opacity: 0 } }
                        animate={ { opacity: 1 } }
                        exit={ { opacity: 0 } }
                        key={ 'responsibility' }
                        className='px-2 py-2 w-full rich-text'
                      >
                        {
                          siteGlobals?.responsibilityData?.content?.length > 0 &&
                          <PortableTextBlocks value={ siteGlobals.responsibilityData.content } />
                        }
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default ProductContent;