import { AnimatePresence, motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import * as _ from 'underscore';
import { durationInSecondsGetHours, durationInSecondsGetMinutes, durationInSecondsGetSeconds } from '../utils/duration.js';

const VideoPlayer = (props) => {

  const { url, noControls, playing, muted, autoplay } = props;
  const [isPlaying, setIsPlaying] = useState(playing === true || autoplay === true ? true : false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [ videoUiIsHidden, setVideoUiIsHidden ] = useState(false);
  const videoPlayerMiniInactivityTimeout = useRef();
  const [ aspectRatio, setAspectRatio ] = useState(0.5625);

  const player = useRef();

  const getCurrentTime = (e) => {
    const timeElapsed = e.playedSeconds;
    setCurrentTime(timeElapsed);
  }

  const getCurrentTimeThrottled = _.throttle(getCurrentTime, 120);

  const getDuration = (e) => {
    const durationInSeconds = e;
    setDuration(durationInSeconds);
  }

  const handleSeek = (e) => {
    player.current.seekTo(e.target.value);
  }

  const handleSeekThrottled = _.throttle(handleSeek, 120);

  const onInactivityTimeoutCompleted = () => {
    setVideoUiIsHidden(true);
  }

  const handleInteract = (e) => {
    clearTimeout(videoPlayerMiniInactivityTimeout.current);
    setVideoUiIsHidden(false);
    videoPlayerMiniInactivityTimeout.current = setTimeout(onInactivityTimeoutCompleted, 3000);

    if (autoplay === true && e._reactName === 'onClick') {
      setIsPlaying(true);
      return;
    }
    if (e._reactName === 'onClick' && typeof playing === 'undefined') {
      setIsPlaying(!isPlaying);

    } else if (e._reactName === 'onClick' && playing === true) {
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    if (typeof playing !== 'undefined') {
      setIsPlaying(playing);
    }
  }, [playing]);

  const handleFullScreen = () => {
    if (player.current?.getInternalPlayer()) {
      if (player.current?.getInternalPlayer().requestFullscreen) {
        player.current?.getInternalPlayer().requestFullscreen();
      } else if (player.current?.getInternalPlayer().webkitRequestFullscreen) { /* Safari */
        player.current?.getInternalPlayer().webkitRequestFullscreen();
      } else if (player.current?.getInternalPlayer().msRequestFullscreen) { /* IE11 */
        player.current?.getInternalPlayer().msRequestFullscreen();
      }
    }
  }

  const handleAspectRatio = () => {
    if (url.indexOf('storage') === 0 || url.indexOf('.mp4') === url.length - 4) {
      if (player.current.getInternalPlayer && player.current.getInternalPlayer().videoWidth && player.current.getInternalPlayer().videoHeight) {
        setAspectRatio(player.current.getInternalPlayer().videoHeight / player.current.getInternalPlayer().videoWidth);
      }
    }
  }

  if (url) {
    return (
      <div
        className={`video-player${url.indexOf('storage') === 0 ? ' video-player--video-element' : ''}`}
        onClick={handleInteract}
        onTouchStart={handleInteract}
        onMouseMove={handleInteract}
        style={{
          paddingBottom: 100 * aspectRatio + '%'
        }}
      >
        <div className="video__wrapper">
          {
            1 === 2 &&
            <button
              className="button--fullscreen"
              aria-label="view fullscreen"
              onClick={handleFullScreen}
            ></button>
          }
          <ReactPlayer
            ref={player}
            url={url}
            className="video-player__player"
            playsinline={true}
            playing={url.indexOf('storage') === 0 || url.indexOf('.mp4') !== -1 ? true : isPlaying}
            volume={1}
            muted={muted === true || autoplay === true ? true : false}
            height={'100%'}
            width={'100%'}
            loop={url.indexOf('storage') === 0 || url.indexOf('.mp4') !== -1 ? true : false}
            onReady={() => {
              handleAspectRatio();
            }}
            onCanPlay={() => {
              handleAspectRatio();
            }}
            onPlay={() => {
              setIsPlaying(true);
              handleAspectRatio();
            }}
            onPause={() => {
              setIsPlaying(false);
              handleAspectRatio();
            }}
            onProgress={(e) => {
              getCurrentTimeThrottled(e)
            }}
            onSeek={(e) => {
              getCurrentTimeThrottled(e)
            }}
            onDuration={(e) => {
              getDuration(e)
            }}
          />
        </div>
        <AnimatePresence>
          {
            isPlaying === false &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .2 }}
              className="video-player__play-icon"
            />
          }
        </AnimatePresence>
        {
          url.indexOf('https://www.youtube.com') === -1 && url.indexOf('youtu.be') === -1 &&
          <div className={`video-player__controls`}>
            <AnimatePresence>
              {
                (videoUiIsHidden === false || isPlaying === false) && noControls !== true && autoplay !== true &&
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .2 }}
                  className="video-player__controls__inner"
                >
                  <div className="video-player__time__wrapper">
                    <p className="video-player__time video-player__time--elapsed">
                      {durationInSecondsGetHours(currentTime)} : {durationInSecondsGetMinutes(currentTime)} : {durationInSecondsGetSeconds(currentTime)}
                    </p>
                    <button
                      className={`video-player__button--play-pause ${isPlaying === false ? 'play' : 'pause'}`}
                      onClick={() => { setIsPlaying(!isPlaying); }}
                    />
                    <div className="video-player__input--time__wrapper">
                      <input
                        type="range"
                        className="video-player__input--time"
                        name="time"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => {
                          setIsPlaying(false);
                          setCurrentTime(e.target.value);
                          handleSeekThrottled(e);
                        }}
                        onMouseDown={() => {
                          setIsPlaying(false);
                        }}
                        onMouseUp={() => {
                          setIsPlaying(true);
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        }
      </div>
    )
  } else {
    return null;
  }
}

export default VideoPlayer;