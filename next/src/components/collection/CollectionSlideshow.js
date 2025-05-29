import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ArrowLeft from '../ArrowLeft';
import ArrowRight from '../ArrowRight';

const CollectionSlideshow = ({ activeSlideIndex, slides, setSlideshowIsActive, setActiveSlideIndex }) => {
  
  const currentActiveSlideIndex = useRef(activeSlideIndex);

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        if (currentActiveSlideIndex.current === slides.length - 1) {
          currentActiveSlideIndex.current = 0;
        } else {
          currentActiveSlideIndex.current = currentActiveSlideIndex.current + 1;
        }
      }
      if (e.key === 'ArrowLeft') {
        if (currentActiveSlideIndex.current === 0) {
          currentActiveSlideIndex.current = slides.length - 1;
        } else {
          currentActiveSlideIndex.current = currentActiveSlideIndex.current - 1;
        }
      }
      if (e.key === 'Escape') {
        setSlideshowIsActive(false);
        currentActiveSlideIndex.current = 0;
      }
      setActiveSlideIndex(currentActiveSlideIndex.current);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ setActiveSlideIndex, setSlideshowIsActive, slides.length ]);

  return (
    <motion.div
      { ...motionProps }
      className='fixed top-0 left-0 bg-putty backdrop-blur bg-opacity-50 w-screen h-screen z-50 flex z-[999]'
    >
      <div className='relative w-full h-full'>
        <AnimatePresence mode='out-in'>
          {
            slides.map((slide, index) => (
              activeSlideIndex === index &&
              <motion.div
                key={ index }
                { ...motionProps }
                className={ `absolute top-0 left-0 w-full h-full pt-32 p-12` }
              >
                <button
                  className='absolute top-0 right-0 p-4 w-full h-full'
                  onClick={ () => setSlideshowIsActive(false) }
                  aria-label='Close slideshow'
                  onMouseEnter={ () => {
                    document.body.style.cursor = 'pointer';
                  } }
                />
                  <img
                    src={ slide.url }
                    alt=''
                    className='w-auto h-auto block max-w-[50vw] max-h-full left-1/2 top-1/2 object-contain relative z-[999] -translate-x-1/2 -translate-y-1/2'
                    onClick={ () => {
                      if (currentActiveSlideIndex.current === slides.length - 1) {
                        currentActiveSlideIndex.current = 0;
                      } else {
                        currentActiveSlideIndex.current = currentActiveSlideIndex.current + 1;
                      }
                    } }
                  />
              </motion.div>
            ))
          }
        </AnimatePresence>
        <button
          className='absolute flex items-center justify-center top-1/2 -translate-y-1/2 h-3/4 left-0 p-4 w-1/4 h-full cursor-pointer'
          aria-label='Previous slide'
          onClick={ () => {
            if (currentActiveSlideIndex.current === 0) {
              currentActiveSlideIndex.current = slides.length - 1;
            } else {
              currentActiveSlideIndex.current = currentActiveSlideIndex.current - 1;
            }
            setActiveSlideIndex(currentActiveSlideIndex.current);
          } }
        >
          <div className='flex justify-center items-center w-10 h-10 p-1 transition-colors duration-200 arrow-left'>
            <ArrowLeft />
          </div>
        </button>
        <button
          className='absolute flex items-center justify-center top-1/2 -translate-y-1/2 h-3/4 right-0 p-4 w-1/4 h-full cursor-pointer'
          aria-label='Next slide'
          onClick={() => {
            if (currentActiveSlideIndex.current === slides.length - 1) {
              currentActiveSlideIndex.current = 0;
            } else {
              currentActiveSlideIndex.current = currentActiveSlideIndex.current + 1;
            }
            setActiveSlideIndex(currentActiveSlideIndex.current);
          } }
        >
          <div className='flex justify-center items-center w-10 h-10 p-1 transition-colors duration-200 arrow-right touch:hidden'>
            <ArrowRight />
          </div>
        </button>
      </div>
      <button
        className='fixed bottom-8 left-8 z-[999] uppercase cursor-pointer'
        onClick={ () => setSlideshowIsActive(false) }
        aria-label='Close slideshow'
      >close</button>
    </motion.div>
  );
};

export default CollectionSlideshow;