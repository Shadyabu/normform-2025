import SoundcloudPlayer from 'react-player/soundcloud';

const Soundcloud = ({ value }) => {
  const { url } = value;

  return (
    <div className='w-full richtext-embed'>
      { url && <SoundcloudPlayer url={ url } /> }
    </div>
  );
};

export default Soundcloud;