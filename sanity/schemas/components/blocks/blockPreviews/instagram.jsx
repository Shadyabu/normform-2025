import { InstagramEmbed } from 'react-social-media-embed';

const InstagramModule = (props) => {

  const { url } = props;

  if (url && url !== '' && url?.indexOf('http') === 0) {
    return (
      <div className='module module--video' style={ { display: 'flex', justifyContent: 'center', width: '100%' } }>
        <InstagramEmbed url={ url } width={ 640 } />
      </div>
    );
  } else {
    return null;
  }
}

export default InstagramModule;