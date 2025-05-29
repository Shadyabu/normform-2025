import HomepageSplash from './HomepageSplash';
import CreativeImageryBanner from '../CreativeImageryBanner';
import CTAMarqueeElement from '../elements/CtaMarqueeElement';
import Footer from '../Footer';
import Link from 'next/link';
import LooksRoulette from './LooksRoulette';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { Suspense } from 'react';

const HomepageContent = ({ homeData }) => {
  const { windowWidth, windowHeight } = useSiteGlobals();
  if (!homeData) return null;

  return (
    <div
      className="w-screen h-screen overflow-y-scroll fixed pb-8"
      style={ {
        height: windowHeight + 'px',
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
          <Link
            className='relative w-full pb-8 z-[2] group block aspect-square'
            href={ '/shop' } 
          >
            <div className='w-full aspect-square'>
              <span className='block absolute hover-button !font-normal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white block rounded-full px-8 bg-black border border-black mouse:group-hover:bg-white mouse:group-hover:text-black'>{ homeData?.shopNowText ?? 'Shop Now' }</span>
            </div>
          </Link>
        </div>
        <div className='col-span-1 border-t border-black sm:border-t-0'>
          <Suspense fallback={ null }>
            <LooksRoulette looks={ homeData?.looksRoulette } />
          </Suspense>
        </div>
      </div>
      <CreativeImageryBanner creativeImagery={ homeData?.creativeImagery } height={ windowWidth >= 768 ? windowHeight * 0.4 + 'px' : windowHeight * 0.8 + 'px' } />
      <Footer footer={ homeData.footer } />
      <div className='fixed bottom-0 w-full h-8 bg-white z-[999]'>
        <CTAMarqueeElement { ...homeData.ctaMarquee } />
      </div>
    </div>
  )
}

export default HomepageContent;