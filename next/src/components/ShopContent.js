import useWindowSize from '@/hooks/useWindowSize';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useMemo } from 'react';

const ShopContent = ({ children }) => {

  const { siteGlobals } = useSiteGlobals();
  const { windowWidth } = useWindowSize();

  const rowLength = useMemo(() => {
    return windowWidth < 500 ? 2 : windowWidth < 768 ? 3 : windowWidth < 1920 ? 4 : 5;
  }, [ windowWidth ]);

  return (
    <div className='w-full h-full top-0 left-0'>
    </div>
  )
}

export default ShopContent;