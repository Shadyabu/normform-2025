import { Flex, Text } from '@sanity/ui';
import SoundcloudPlayer from 'react-player/soundcloud';

const SoundcloudPreview = (props) => {
  
  const { url } = props;

  return (
    <Flex padding={ 4 } justify={ 'center' }>
      {
        url && url?.indexOf('http') === 0 ?
          <SoundcloudPlayer url={ url } />
          : <Text>Add a Soundcloud URL</Text>
      }
    </Flex>
  );
};

export default SoundcloudPreview