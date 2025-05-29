import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useState, useRef } from 'react';
import Marquee from 'react-fast-marquee';

const CTAMarquee = ({ text }) => {

  const { windowWidth, } = useSiteGlobals();

  const reference = useRef();

  const [ iterations, setIterations ] = useState(1);

  useEffect(() => {
    let raf = null;
    const calculateWidth = () => {
      if (reference.current) {
        const width = reference.current.offsetWidth;
        const iterations = Math.max(1, Math.floor(windowWidth / width));
        setIterations(iterations);
      } else {
        raf = requestAnimationFrame(calculateWidth);
      }
    };

    calculateWidth();

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [ windowWidth ]);

  return (
    <div className='w-full h-8'>
      <Marquee gradient={ false }>
        <div className='w-auto h-8 whitespace-nowrap flex justify-evenly items-center'
          style={ {
            maxWidth: iterations > 1 ? windowWidth + 'px' : undefined,
            minWidth: iterations === 1 ? windowWidth + 'px' : undefined,
          } }
        >
          {
            Array(iterations).fill('').map((_, index) => (
              <span
                key={ index } className='block leading-[1em] whitespace-nowrap'
                style={ {
                  paddingRight: iterations > 1 ? 60 + 'px' : undefined,
                } }
              >{ text }{ iterations === 1 && <span className='inline-block px-4'> · </span> }</span>
            ))
          }
        </div>
      </Marquee>
      <span ref={ reference } className='absolute opacity-0 pointer-events-none inline-block leading-[1em] whitespace-nowrap pr-8 bg-white'>{ text }</span>
    </div>
  );
};

export default CTAMarquee;