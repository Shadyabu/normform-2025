import { TikTokEmbed } from 'react-social-media-embed';

const TikTokModule = (props) => {

  const { url } = props;

  if (url && url !== '' && url?.indexOf('http') === 0) {
    return (
      <div className='module module--video' style={ { display: 'flex', justifyContent: 'center', width: '100%' } }>
        <TikTokEmbed url={ url } width={ 640 } />
      </div>
    );
  } else {
    return null;
  }
}

export default TikTokModule;