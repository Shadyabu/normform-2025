import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import 'swiper/css';

const ProductSlideshow = ({ shopify }) => {

  const images = useMemo(() => {
    if (shopify?.images?.edges?.length > 0) {
      return shopify?.images.edges.map((image) => {
        return {
          url: image.node.src,
          altText: image.node.altText,
        };
      });
    } else {
      return [];
    }
  }, [ shopify ]);

  return (
    <div className='relative w-auto h-full'>
      <Swiper
        className='h-full'
        modules={ [ Navigation, A11y ] }
        spaceBetween={ 0 }
        slidesPerView={ 1 }
        loop={ true }
        navigation={ { prevEl: '.arrow-left', nextEl: '.arrow-right' } }
        fadeEffect={ { crossFade: true } }
      >
        {
          images?.length > 0 &&
          images?.map((image, index) => (
            <SwiperSlide key={ index } className='h-full'>
              <div className='img-wrapper relative h-full flex justify-center items-center'>
                <img className='block relative max-w-full w-auto h-auto' src={ image.url } alt={ image.altText } />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      {
        images?.length > 1 &&
        <div className='absolute w-full h-full flex justify-between items-center top-0 left-0 pointer-events-none z-[999]'>
          <button
            className='flex justify-center items-center w-10 h-10 p-1 transition-colors duration-200 arrow-left font-normal touch:hidden'
            style={ {
              pointerEvents: 'all',
            } }
          >
            { '<' }
          </button>
          <button
            className='flex justify-center items-center w-10 h-10 p-1 transition-colors duration-200 arrow-right font-normal touch:hidden'
            style={ {
              pointerEvents: 'all',
            } }
          >
            { '>' }
          </button>
        </div>
      }
    </div>
  );
};

export default ProductSlideshow;