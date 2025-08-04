import { Canvas } from '@react-three/fiber';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import LogoScene from './LogoScene';
import { useState, useEffect } from 'react';

const LogoSceneCanvas = () => {
  
  const { windowWidth, windowHeight } = useSiteGlobals();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default values during SSR to prevent hydration mismatch
  const canvasWidth = mounted && windowWidth > 0 ? windowWidth : '100%';
  const canvasHeight = mounted && windowHeight > 0 ? windowHeight : '100%';

  return (
    <>
      <div
        style={ { width: canvasWidth, height: canvasHeight } }
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