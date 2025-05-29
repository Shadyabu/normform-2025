import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import PortableTextBlocks from '@/components/blocks/PortableTextBlocks';
import { PRIVACY } from '@/fragments/pages/privacy';
import client from '@/hooks/useSanityQuery';
import useWindowSize from '@/hooks/useWindowSize';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';
import groq from 'groq';

export default function Privacy({ globalData, privacyData }) {

  const { footerHeight } = useSiteGlobals();
  const { windowHeight } = useWindowSize();

  return (
    <div className='w-screen h-screen fixed top-0 left-0'>
      <Seo { ...{ ...privacyData, globalData } } />
      <div className='w-full h-full overflow-y-scroll pt-36'>
        <div
          className='min-h-[60vh] rich-text px-8 pb-40'
          style={ {
            minHeight: windowHeight - footerHeight - 160,
          } }
        >
          <div className='max-w-[36em] mx-auto'>
            {
              privacyData?.privacyPolicy?.length > 0 &&
              <PortableTextBlocks value={ privacyData.privacyPolicy } />
            }
          </div>
        </div>
        <Footer />
      </div>
      <SetGlobalProps { ...{ globalData } } />
    </div>
  )
}

export async function getStaticProps() {

  const isHoldingPage = await client.fetch(groq`*[_type == 'settings'][0].holdingPage`);
  if (isHoldingPage === true && process.env.FULL_SITE !== 'true') {
    return {
      props: {
        isHoldingPage
      }
    };
  } else {
    const globalData = await getGlobalProps();
    const privacyData = await client.fetch(PRIVACY);

    return {
      props: {
        globalData,
        privacyData,
      }
    };
  }
}