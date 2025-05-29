import VimeoPlayer from 'react-player/vimeo';

const Vimeo = ({ value }) => {
  const { url } = value;

  return (
    <div className='w-full richtext-embed'>
      { url && <VimeoPlayer url={ url } /> }
    </div>
  );
};

export default Vimeo;