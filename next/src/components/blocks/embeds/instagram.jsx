import useWindowSize from '@/hooks/useWindowSize';
import { InstagramEmbed } from 'react-social-media-embed';
import { useState, useEffect } from 'react';

const InstagramModule = ({ value }) => {

  const { url } = value;
  const { windowWidth } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default width during SSR to prevent hydration mismatch
  const embedWidth = mounted && windowWidth > 0 ? Math.min(windowWidth - 80, 640) : 560;

  if (url && url !== '') {
    return (
      <div className='richtext-embed w-full'>
        <InstagramEmbed url={ url } width={ embedWidth } />
      </div>
    );
  } else {
    return null;
  }
}

export default InstagramModule;