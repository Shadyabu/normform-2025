import { useRef, useEffect, useMemo } from 'react';
import { OrthographicCamera } from '@react-three/drei';
import Logo from './Logo';
import useWindowSize from '@/hooks/useWindowSize';

const LogoScene = () => {

  const { windowWidth, windowHeight } = useWindowSize();

  const targetScale = useRef(0);
  const group = useRef(null);
  
  const scale = useMemo(() => {
    const windowMin = Math.min(windowWidth, windowHeight);
    const windowMax = Math.max(windowWidth, windowHeight);
  
    if (windowWidth >= 1024) {
      return Math.min(windowMin / windowMax, 0.8) * 1.2;
    } else {
      return Math.min(windowMin / windowMax, 0.8) * 0.6;
    }

  }, [ windowWidth, windowHeight ]);


  useEffect(() => {

    let raf = requestAnimationFrame(() => { });

    const animate = () => {

      if (
        group.current &&
        Math.abs(group.current.scale.x - targetScale.current) < 0.1
      ) {

      } else {
        raf = requestAnimationFrame(animate);
      }
    }

    let timeout = setTimeout(() => {
      raf = requestAnimationFrame(animate);
    }, 900);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [ windowWidth, windowHeight ]);

  return (
    <group>
      <group
        scale={ [ scale, scale, scale ] }
        ref={ group }
      >
        <Logo />
      </group>
      <OrthographicCamera
        near={ 0.01 }
        far={ 100000 }
        makeDefault={ true }
        zoom={ 6 }
      />
    </group>
  )
};

export default LogoScene;