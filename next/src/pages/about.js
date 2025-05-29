import PortableTextBlocks from '@/components/blocks/PortableTextBlocks';
import CtaMarqueeElement from '@/components/elements/CtaMarqueeElement';
import { ABOUT } from '@/fragments/pages/about';
import client from '@/hooks/useSanityQuery';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

export default function About({ aboutData, globalData }) {
  const { windowWidth, windowHeight } = useSiteGlobals();

  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      className='w-screen h-screen fixed top-0 left-0 z-[1] overflow-y-scroll pb-8'
      style={ {
        height: windowHeight + 'px',
      } }
    >
      <Seo { ...{ ...aboutData, globalData } } />
      <div
        className='w-screen sm:grid sm:grid-cols-2'
        style={ {
          height: windowWidth >= 768 ? windowHeight - 30 + 'px' : undefined,
        } }
      >
        <div className='sm:col-span-1 sm:px-8 max-sm:pt-12 max-sm:p-4 sm:flex sm:justify-center sm:items-center'>
          <div className='sm:border sm:border-black sm:p-4 max-w-[32em] rich-text'>
            {
              aboutData?.text?.length > 0 &&
              <PortableTextBlocks value={ aboutData.text } />
            }
          </div>
        </div>
        <div className='sm:col-span-1 sm:border-l sm:border-l-black sm:overflow-hidden max-sm:border-t max-sm:border-t-black'>
          {
            aboutData?.seoImage?.url &&
            <img
              className='block w-full sm:h-full sm:object-cover'
              style={ {
                objectPosition: windowWidth > windowHeight ? `${ aboutData.seoImage?.hotspotDesktop?.x }% ${ aboutData.seoImage?.hotspotDesktop?.y }%` : `${ aboutData.seoImage?.hotspotMobile?.x }% ${ aboutData.seoImage?.hotspotMobile?.y }%`
              } }
              src={ aboutData.seoImage.url }
              alt={ aboutData.seoImage.alt }
            />
          }
        </div>
      </div>
      <Footer />
      <div className='fixed bottom-0 w-full h-8 bg-white z-[999]'>
        <CtaMarqueeElement { ...{
          text: aboutData?.ctaMarquee?.text ? aboutData.ctaMarquee.text : 'About NORMFORM',
          action: aboutData?.ctaMarquee?.action,
          linkInternal: aboutData?.ctaMarquee?.linkInternal,
          linkExternal: aboutData?.ctaMarquee?.linkExternal,
        } } />
      </div>
      <SetGlobalProps { ...{ globalData } } />
    </motion.div>
  )
}

export async function getStaticProps() {
  const aboutData = await client.fetch(ABOUT, {});
  const globalData = await getGlobalProps();
  return {
    props: {
      aboutData,
      globalData
    },
  };
}