import YoutubePlayer from 'react-player/youtube';

const Youtube = ({ value }) => {
  const { url } = value;

  return (
    <div className='w-full richtext-embed'>
      { url && <YoutubePlayer url={ url } /> }
    </div>
  );
};

export default Youtube;