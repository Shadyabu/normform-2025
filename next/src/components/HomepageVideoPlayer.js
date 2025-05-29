import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import * as _ from 'underscore';
import useWindowSize from '@/hooks/useWindowSize.jsx';
import { AnimatePresence, motion } from 'framer-motion';

const HomepageVideoPlayer = (props) => {

  const { url, poster } = props;
  const [ shouldBePlaying, setShouldBePlaying ] = useState(true);
  const [ playing, setPlaying ] = useState(false);

  const { windowWidth, windowHeight } = useWindowSize();

  const player = useRef();

  useEffect(() => {
    const handleClick = () => {
      if (player.current && playing === false) {
        setShouldBePlaying(true);
      }
    }

    window.addEventListener('click', handleClick);
    handleClick();

    return () => {
      window.removeEventListener('click', handleClick);
    }
  }, [ playing ]);

  if (!url) return null;

  return (
    <>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
        style={ {
          minHeight: `${ windowHeight }px`,
          minWidth: `${ windowWidth }px`,
          aspectRatio: `${ 16 } / ${ 9 }`,
        } }
      >
        <ReactPlayer
          ref={ player }
          url={ url }
          className="video-player__player"
          playsinline={ true }
          playing={ shouldBePlaying }
          onError={ (error) => {
            setPlaying(false);
            setShouldBePlaying(false);
          } }
          poster={ poster }
          volume={ 1 }
          muted={ true }
          height={ '100%' }
          width={ '100%' }
          loop={ true }
          onPlay={ () => {
            setPlaying(true);
          } }
          onPause={ () => {
            setPlaying(false);
          } }
        />
      </div>
      <AnimatePresence>
        {
          !playing &&
          poster &&
          <motion.img
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            exit={ { opacity: 0 } }
            className='fixed top-0 left-0 w-screen h-screen z-20 block object-cover object-center'
            src={ poster }
            alt=''
          />
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          !playing &&
          !poster &&
          <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            exit={ { opacity: 0 } }
            className='fixed top-0 left-0 w-screen h-screen z-20 block object-cover object-center bg-black'
          />
        }
      </AnimatePresence>
    </>
  );
}

export default HomepageVideoPlayer;