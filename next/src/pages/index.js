import SetGlobalProps from '@/utils/SetGlobalProps';
import getGlobalProps from '@/utils/getGlobalProps';
import client from '@/hooks/useSanityQuery';
import { HOME } from '@/fragments/pages/home';
import HomepageContent from '@/components/homepage/HomepageContent';
import Seo from '@/components/Seo';

export default function Home({ globalData, homeData }) {

  return (
    <>
      <Seo { ...{ ...homeData, globalData } } />
      <HomepageContent { ...{ homeData } } />
      <SetGlobalProps { ...{ globalData } } />
    </>
  )
}

export async function getStaticProps() {
  const homeData = await client.fetch(HOME);
  const globalData = await getGlobalProps();
  return {
    props: {
      homeData,
      globalData,
    }
  };
}