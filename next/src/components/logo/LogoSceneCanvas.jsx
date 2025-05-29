import { Canvas } from '@react-three/fiber';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import LogoScene from './LogoScene';

const LogoSceneCanvas = () => {
  
  const { windowWidth, windowHeight } = useSiteGlobals();

  return (
    <>
      <div
        style={ { width: windowWidth + 'px', height: windowHeight + 'px' } }
        className={ `canvas-wrapper w-full h-full absolute top-0 left-0` }
      >
        <Canvas
          onCreated={ (state) => {
            if (state?.events?.connect) {
              state.events.connect(window);
            }
          } }
        >
          <LogoScene />
        </Canvas>
      </div>
    </>
  )
}

export default LogoSceneCanvas;