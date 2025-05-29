import { Spotify } from 'react-spotify-embed';

const SpotifyPlayer = (props) => {
  
  const { url } = props;

  return (
    <div className='richtext-embed w-full'>
      { url && <Spotify wide link={ url } /> }
    </div>
  );
};

export default SpotifyPlayer;