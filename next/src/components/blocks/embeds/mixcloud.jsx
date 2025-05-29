import MixcloudPlayer from 'react-player/mixcloud';

const Mixcloud = ({ value }) => {
  const { url } = value;

  return (
    <div className='w-full richtext-embed'>
      { url && <MixcloudPlayer url={ url } /> }
    </div>
  );
};

export default Mixcloud;