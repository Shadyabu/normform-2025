import useWindowSize from '@/hooks/useWindowSize';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CollectionSlideshow from './CollectionSlideshow';

const CollectionContent = ({ collectionData }) => {

  const { windowWidth } = useWindowSize();
  const [ slideshowIsActive, setSlideshowIsActive ] = useState(false);
  const [ activeSlideIndex, setActiveSlideIndex ] = useState(0);

  useEffect(() => {
    if (windowWidth < 768) {
      setSlideshowIsActive(false);
    }
  }, [ windowWidth ]);
  
  return (
    <>
      <div
        className='w-screen h-screen fixed overflow-y-scroll'
        style={ {
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 6em, rgba(0, 0, 0, 1) 7em)',
        } }
      >
        <div className='w-full text-center px-6 pt-36 pb-14'>
          <div className='w-full mb-12 text-center'>
            <h2 className='font-bold uppercase'>{ collectionData?.fullTitle ?? collectionData.title }</h2>
          </div>
          {
            collectionData?.gallery?.length > 0 &&
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-3 max-w-[768px] mx-auto'>
              {
                collectionData.gallery.map((image, index) => (
                  <div
                    key={ index }
                    className='relative col-span-1'
                    onClick={ () => {
                      if (windowWidth >= 768) {
                        setSlideshowIsActive(true);
                        setActiveSlideIndex(index);
                      }
                    } }
                  >
                    <img
                      src={ image.url }
                      alt={ image.alt }
                      className='w-full'
                    />
                  </div>
                ))
              }
            </div>
          }
        </div>
        <div className='p-6'>
          <Footer />
        </div>
      </div>
      <AnimatePresence>
        {
          slideshowIsActive &&
          <CollectionSlideshow { ...{ activeSlideIndex, setActiveSlideIndex, slides: collectionData.gallery, setSlideshowIsActive } } />
        }
      </AnimatePresence>
    </>
  )
}

export default CollectionContent;