import { Flex, Text } from '@sanity/ui';
import { Spotify } from 'react-spotify-embed';

const SpotifyPreview = (props) => {
  
  const { url } = props;

  return (
    <Flex padding={ 4 } justify={ 'center' }>
      {
        url && url?.indexOf('http') === 0 ?
          <Spotify wide link={ url } />
          : url && url?.indexOf('http') !== 0 ?
            <Text>Add a valid Spotify URL (embed code won’t work!)</Text>
          : <Text>Add a Spotify URL</Text>
      }
    </Flex>
  );
};

export default SpotifyPreview;