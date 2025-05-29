import { Flex, Text } from '@sanity/ui';
import YouTubePlayer from 'react-player/youtube';

const YouTubePreview = (props) => {
  
  const { url } = props;

  return (
    <Flex padding={ 4 } justify={ 'center' }>
      {
        url && url?.indexOf('http') === 0 ?
          <YouTubePlayer url={ url } />
          : <Text>Add a YouTube URL</Text>
      }
    </Flex>
  );
};

export default YouTubePreview