import useWindowSize from '@/hooks/useWindowSize';
import { InstagramEmbed } from 'react-social-media-embed';

const InstagramModule = ({ value }) => {

  const { url } = value;
  const { windowWidth } = useWindowSize();

  if (url && url !== '') {
    return (
      <div className='richtext-embed w-full'>
        <InstagramEmbed url={ url } width={ Math.min(windowWidth - 80, 640) } />
      </div>
    );
  } else {
    return null;
  }
}

export default InstagramModule;