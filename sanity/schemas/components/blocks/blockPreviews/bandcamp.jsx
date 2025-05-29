import { Flex, Text } from '@sanity/ui';

const BandCampPreview = (props) => {
  
  const { url } = props;

  return (
    <Flex padding={ 4 } justify={ 'center' }>
      {
        url && url?.indexOf('http') === 0 ?
          <iframe src={ url } width={ 450 } height={ 350 } />
          : <Text>Add a BandCamp URL</Text>
      }
    </Flex>
  );
};

export default BandCampPreview