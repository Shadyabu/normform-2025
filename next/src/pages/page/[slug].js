import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import PortableTextBlocks from '@/components/blocks/PortableTextBlocks';
import { PAGE } from '@/fragments/pages/page';
import client from '@/hooks/useSanityQuery';
import useWindowSize from '@/hooks/useWindowSize';
import SetGlobalProps from '@/utils/SetGlobalProps';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import getGlobalProps from '@/utils/getGlobalProps';
import groq from 'groq';

export default function Page({ pageData, globalData }) {

  const { footerHeight } = useSiteGlobals();
  const { windowHeight } = useWindowSize();

  return (
    <div className='w-screen h-screen fixed top-0 left-0'>
      <Seo { ...{ ...pageData, globalData } } />
      <div
        className='w-full h-full overflow-y-scroll pt-36'
        style={ {
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 6em, rgba(0, 0, 0, 1) 7em)',
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 6em, rgba(0, 0, 0, 1) 7em)',
        } }
      >
        <div
          className='min-h-[60vh] rich-text px-8 pb-40'
          style={ {
            minHeight: windowHeight - footerHeight - 160,
          } }
        >
          <div className='max-w-[36em] mx-auto'>
          {
            pageData?.content?.length > 0 &&
            <PortableTextBlocks value={ pageData.content } />
            }
          </div>
        </div>
        <Footer />
      </div>
      <SetGlobalProps { ...{ globalData } } />
    </div>
  )
}

export async function getStaticPaths(context) {
  const pages = await client.fetch(groq`*[_type == 'page'][] {
    "slug": slug.current,
  }`, {});

  let paths = [];
  if (pages?.length > 0) {
    paths = pages.map((page) => ({
      params: {
        slug: page.slug,
      },
    }));
  }

  const isHoldingPage = await client.fetch(groq`*[_type == 'settings'][0].holdingPage`);
  if (isHoldingPage === true && process.env.FULL_SITE !== 'true') {
    return { paths: [], fallback: 'blocking' };
  } else {
    return { paths, fallback: false };
  }
}

export async function getStaticProps(context) {

  let pageData = null;

  if (context?.params?.slug) {
    pageData = await client.fetch(PAGE, { slug: context.params.slug });
  } else {
    pageData = {
      title: 'Page not found',
      _type: '404',
    };
  }

  const globalData = await getGlobalProps();

  return {
    props: {
      pageData,
      globalData
    },
  }
}