import { Flex, Text } from '@sanity/ui';
import MixcloudPlayer from 'react-player/mixcloud';

const MixcloudPreview = (props) => {
  
  const { url } = props;

  return (
    <Flex padding={ 4 } justify={ 'center' }>
      {
        url && url?.indexOf('http') === 0 ?
          <MixcloudPlayer url={ url } />
          : <Text>Add a Mixcloud URL</Text>
      }
    </Flex>
  );
};

export default MixcloudPreview