import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect, useRef, useState } from 'react';
import SignUpFormHoldingPage from './SignUpFormHoldingPage';

const HoldingPage = () => {

  const { siteGlobals, setHoldingPage, holdingPage, } = useSiteGlobals();
  const video = useRef();
  const [ videoIsPlaying, setVideoIsPlaying ] = useState(false);
  const [ password, setPassword ] = useState('');

  useEffect(() => {
    const handleMouseClick = () => {
      if (video.current?.paused) {
        video.current.play()
          .catch((error) => {
            console.error('Error playing video:', error);
          });
      }
    };

    document.addEventListener('click', handleMouseClick);

    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <div>
      <form onSubmit={ (e) => {
        e.preventDefault();
        if (password === siteGlobals?.settingsData?.teaserPagePassword) {
          setHoldingPage(false);
        }
      } }>
        <input type='password' onChange={ (e) => setPassword(e.target.value) } value={ password } placeholder='password' className='border border-black fixed top-2 right-2 z-[999]' />
      </form>
      <div className='min-h-[60vh] w-full flex justify-center items-center'>
        <div className='aspect-video relative w-full max-w-[720px]'>
          <video
            ref={ video }
            muted
            autoPlay
            loop
            playsInline={ true }
            src='/normformloop.mp4'
            className='block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            style={ {
              opacity: videoIsPlaying ? 1 : 0,
              transition: 'opacity 0.5s',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            } }
            onPlay={ () => setVideoIsPlaying(true) }
          />
          <img
            src='/normformloopstill.jpg'
            className='block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            style={ {
              opacity: videoIsPlaying ? 0 : 1,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            } }
            onPlay={ () => setVideoIsPlaying(true) }
          />
        </div>
      </div>
      <div className='max-w-[720px] mx-auto text-center'>
        <SignUpFormHoldingPage />
      </div>
      <div className='flex items-center justify-center flex-wrap gap-2 mt-24'>
      {
        siteGlobals?.settingsData?.teaserPageSocialLinks?.map((item, index) => (
          <a href={ item.link } key={ index } rel={ 'noopener noreferrer' } target='_blank' className='block text-center w-8 h-auto' title={item.title}>
            <img src={ item.icon } className='w-8 h-auto block' alt={ item.title } />
          </a>
        ))
      }
      </div>
    </div>
  );
}

export default HoldingPage;