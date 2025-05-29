import client from '@/hooks/useSanityQuery';
import SetGlobalProps from '@/utils/SetGlobalProps';
import getGlobalProps from '@/utils/getGlobalProps';
import groq from 'groq';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function PageNotFound404({ globalData, isHoldingPage }) {

  const router = useRouter();

  useEffect(() => {
    router.replace('/shop');
  }, [ router ]);

  if (isHoldingPage === true && process.env.FULL_SITE !== 'true') {
    return null;
  }

  return (
    <SetGlobalProps { ...{ globalData } } />
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

    return {
      props: {
        globalData,
      },
    };
  }
}