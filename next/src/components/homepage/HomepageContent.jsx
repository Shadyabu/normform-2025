import HomepageSplash from './HomepageSplash';
import CreativeImageryBanner from '../CreativeImageryBanner';
import CTAMarqueeElement from '../elements/CtaMarqueeElement';
import Footer from '../Footer';
import Link from 'next/link';
import LooksRoulette from './LooksRoulette';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { Suspense, useState, useEffect } from 'react';

const HomepageContent = ({ homeData }) => {
  const { windowWidth, windowHeight } = useSiteGlobals();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!homeData) return null;

  // Use a default height during SSR to prevent hydration mismatch
  const contentHeight = mounted && windowHeight > 0 ? windowHeight : '100vh';
  const bannerHeight = mounted && windowWidth > 0 ? 
    (windowWidth >= 768 ? windowHeight * 0.4 + 'px' : windowHeight * 0.8 + 'px') : 
    '40vh';

  return (
    <div
      className="w-screen h-screen overflow-y-scroll fixed pb-8"
      style={ {
        height: contentHeight,
      } }
    >
      <HomepageSplash homeData={ homeData } />
      <div className='sm:grid grid-cols-1 sm:grid-cols-2 border-t border-t-black'>
        <div className='col-span-1 sm:border-r border-black relative'>
          <img
            className='w-full h-full object-cover absolute top-0 left-0 z-[1]'
            src={ homeData?.shopNowImage?.url }
            alt={ homeData?.shopNowImage?.alt }
          />
          <div className='relative w-full pb-8 z-[2] group block aspect-square'>
            <div className='w-full aspect-square'>
              <Link
                className='w-full aspect-square block'
                href={ '/shop' } 
              >
                <span className='block absolute hover-button !font-normal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white block rounded-full px-8 bg-black border border-black mouse:group-hover:bg-white mouse:group-hover:text-black'>{ homeData?.shopNowText ?? 'Shop Now' }</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='col-span-1 border-t border-black sm:border-t-0'>
          <Suspense fallback={ null }>
            <LooksRoulette looks={ homeData?.looksRoulette } />
          </Suspense>
        </div>
      </div>
      <CreativeImageryBanner creativeImagery={ homeData?.creativeImagery } height={ bannerHeight } />
      <Footer footer={ homeData.footer } />
      <div className='fixed bottom-0 w-full h-8 bg-white z-[999]'>
        <CTAMarqueeElement { ...homeData.ctaMarquee } />
      </div>
    </div>
  )
}

export default HomepageContent;