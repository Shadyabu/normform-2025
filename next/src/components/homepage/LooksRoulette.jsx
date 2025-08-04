import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const LooksRoulette = ({ looks }) => {

  const [ currentLook, setCurrentLook ] = useState(0);
  const [ imageAspectRatios, setImageAspectRatios ] = useState([]);
  const [mounted, setMounted] = useState(false);
  const { windowWidth } = useSiteGlobals();
  
  useEffect(() => {
    setMounted(true);
    const aspectRatios = [];
    
    if (looks.length) {
      for (let i = 0; i < looks.length; i++) {
        aspectRatios.push(1);
        let image = new Image();
        image.src = looks[ i ].image.url;
        image.onload = () => {

          aspectRatios[ i ] = image.width / image.height;
          if (aspectRatios.length === looks.length) {
            setImageAspectRatios(aspectRatios);
          }
        };
      }
    }
  }, [ looks ]);

  // Use default text during SSR to prevent hydration mismatch
  const buttonText = mounted && windowWidth > 767 ? 'show me another look' : 'next look';

  return (
    <div className='w-full relative aspect-square group'>
      <div className='absolute w-full h-full left-0 top-0 pb-10 flex justify-center items-center p-2'>
        <div
          className='relative'
          style={ {
            width: imageAspectRatios[ currentLook ] > 1 ? `100%` : `${ 100 * imageAspectRatios[ currentLook ] }%`,
            height: imageAspectRatios[ currentLook ] > 1 ? `${ 100 / imageAspectRatios[ currentLook ] }%` : `100%`,
          } }
        >
          {mounted ? (
            <AnimatePresence mode='wait'>
              <motion.img
                key={ `${ currentLook }image` }
                initial={ { rotate: 0, scale: 0 } }
                animate={ { rotate: 720, scale: 1 } }
                exit={ { rotate: 1440, scale: 0 } }
                transition={ { duration: 0.6, style: 'linear' } }
                className='w-full object-contain h-full absolute top-0 left-0 z-[1]'
                src={ looks[ currentLook ].image.url }
                alt={ looks[ currentLook ].image.alt }
              />
            </AnimatePresence>
          ) : (
            <img
              className='w-full object-contain h-full absolute top-0 left-0 z-[1]'
              src={ looks[ currentLook ].image.url }
              alt={ looks[ currentLook ].image.alt }
            />
          )}
          {mounted ? (
            <AnimatePresence mode='waitForChildren'>
              <motion.div
                key={ currentLook }
                transition={ { duration: 0.9 } }
                className='w-full h-full relative z-[2]'
              >
                {
                  looks[ currentLook ].hotspots?.map((hotspot, index) => (
                    hotspot?.product?.store &&
                    <motion.div
                      key={ `${ index }hotspot` }
                      initial={ { scale: 0 } }
                      animate={ { scale: 1 } }
                      exit={ { scale: 0 } }
                      transition={ { duration: 0.9 } }
                      className='absolute w-8 h-8'
                      style={ {
                        top: `${ hotspot.y }%`,
                        left: `${ hotspot.x }%`,
                      } }
                    >
                      <Link
                        href={ `/product/${ hotspot.product.slug.current }` }
                        className='block w-8 h-8 bg-black mouse:opacity-0 mouse:group-hover:opacity-100 transition-opacity rounded-full text-white border border-black text-center flex items-center justify-center mouse:hover:bg-white mouse:hover:text-black mouse:hover:scale-[1.2] transition-colors transition-transform duration-300'
                      >
                        <span className='block leading-[1em]'>
                          { index + 1 }
                        </span>
                      </Link>
                    </motion.div>
                  ))
                }
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className='w-full h-full relative z-[2]'>
              {
                looks[ currentLook ].hotspots?.map((hotspot, index) => (
                  hotspot?.product?.store &&
                  <div
                    key={ `${ index }hotspot` }
                    className='absolute w-8 h-8'
                    style={ {
                      top: `${ hotspot.y }%`,
                      left: `${ hotspot.x }%`,
                    } }
                  >
                    <Link
                      href={ `/product/${ hotspot.product.slug.current }` }
                      className='block w-8 h-8 bg-black mouse:opacity-0 mouse:group-hover:opacity-100 transition-opacity rounded-full text-white border border-black text-center flex items-center justify-center mouse:hover:bg-white mouse:hover:text-black mouse:hover:scale-[1.2] transition-colors transition-transform duration-300'
                    >
                      <span className='block leading-[1em]'>
                        { index + 1 }
                      </span>
                    </Link>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
      <div className='mouse:opacity-0 mouse:group-hover:opacity-100 transition-opacity duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] hover-button'>
        <button
          onClick={ () => {
            let newLook = currentLook;
            if (looks.length > 1) {
              while (newLook === currentLook) {
                newLook = Math.floor(Math.random() * looks.length);
              }
              setCurrentLook(newLook);
            }
          } }
          className='text-white text-center w-full h-full hover-button mouse:hover:scale-[1.2] px-8 bg-black border border-black group mouse:hover:bg-white mouse:hover:text-black rounded-full transition-colors transition-transform duration-300 mouse:hover:text-black'
        >{ buttonText }</button>
      </div>
    </div>
  );
}

export default LooksRoulette;