import { SHOP_SIDEBAR } from '@/fragments/components/shop/shopSidebar';
import client from '../hooks/useSanityQuery';
import { SETTINGS } from '@/fragments/globals/settings';
import { COLLECTIONS } from '@/fragments/pages/collections';
import { COLORS } from '@/fragments/pages/colors';
import { SIZES } from '@/fragments/pages/sizes';
import { SIZING_CHART } from '@/fragments/pages/sizingChart';
import { RESPONSIBILITY } from '@/fragments/pages/responsibility';
import { SIGNUP_FORM } from '@/fragments/components/signupForm';

const getGlobalProps = async () => {
  const settingsData = await client.fetch(SETTINGS);
  const signupFormData = await client.fetch(SIGNUP_FORM);

  if (settingsData?.teaserPage === true && process.env.FULL_SITE !== 'true' && process.env.FULL_SITE !== true) {
    return {
      settingsData,
      signupFormData,
    };
  }
  
  const shopSidebarData = await client.fetch(SHOP_SIDEBAR);
  const sizingChartData = await client.fetch(SIZING_CHART);
  const responsibilityData = await client.fetch(RESPONSIBILITY);

  const dataCollections = [
    { collection: COLLECTIONS, key: 'collectionsData' },
    { collection: COLORS, key: 'colorsData' },
    { collection: SIZES, key: 'sizesData' },
  ];

  const collectionsObject = {};

  for (let item of dataCollections) {
    const data = await client.fetch(item.collection);
    const dataArray = [];
    if (data?.length > 0) {
      for (let item of data) {
        dataArray.push(item);
      }
    }
    collectionsObject[ item.key ] = dataArray;
  }

  

  return {
    settingsData,
    shopSidebarData,
    sizingChartData,
    signupFormData,
    responsibilityData,
    ...collectionsObject,
  };
};

export default getGlobalProps;