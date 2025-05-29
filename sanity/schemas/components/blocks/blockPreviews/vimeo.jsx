import { Flex, Text } from '@sanity/ui';
import VimeoPlayer from 'react-player/vimeo';

const VimeoPreview = (props) => {
  
  const { url } = props;

  return (
    <Flex padding={ 4 } justify={ 'center' }>
      {
        url && url?.indexOf('http') === 0 ?
          <VimeoPlayer url={ url } />
          : <Text>Add a Vimeo URL</Text>
      }
    </Flex>
  );
};

export default VimeoPreview