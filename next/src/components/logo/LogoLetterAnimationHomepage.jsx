import { useFrame } from '@react-three/fiber';
import lerp from '../../utils/lerp';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const LogoLetterAnimationHomepage = (props) => {

  const { targetScale, isDisappeared, currentScale, mesh, bones, isFullscreen } = props;
  const router = useRouter();

  const idleTimeout = useRef(null);
  const targetMouse = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    mouse.current.x = lerp(mouse.current.x, targetMouse.current.x, 0.1);
    mouse.current.y = lerp(mouse.current.y, targetMouse.current.y, 0.1);

    if (targetScale.current > 0 && isDisappeared.current === false) {
      currentScale.current = lerp(currentScale.current, targetScale.current, 0.15);
    } else {
      currentScale.current = lerp(currentScale.current, targetScale.current, 0.2);
    }
    if (mesh?.current?.scale) {
      mesh.current.scale.x = currentScale.current;
      mesh.current.scale.y = currentScale.current;
      mesh.current.scale.z = currentScale.current;
    }

    if (bones.current) {
      if (isFullscreen === true && router.pathname !== '/world') {
        // horizontal
        for (const bone of bones.current) {
          let newScaleY = bone.scale.y;
          if (mouse.current.y < 0 && typeof bone.vertical === 'number') {
            if (bone.vertical >= 2) {
              newScaleY = (-mouse.current.y / 8) + 1;
            } else {
              newScaleY = (mouse.current.y / 12) + 1;
            }
          } else if (mouse.current.y > 0 && typeof bone.vertical === 'number') {
            if (bone.vertical < 2) {
              newScaleY = (mouse.current.y / 8) + 1;
            } else {
              newScaleY = (-mouse.current.y / 12) + 1;
            }
          } else if (mouse.current.x > 0 && typeof bone.horizontal === 'number') {
            if (bone.horizontal >= 2) {
              newScaleY = (mouse.current.x / 8) + 1;
            } else {
              newScaleY = (-mouse.current.x / 12) + 1;
            }
          } else if (mouse.current.x < 0 && typeof bone.horizontal === 'number') {
            if (bone.horizontal < 2) {
              newScaleY = (-mouse.current.x / 8) + 1;
            } else {
              newScaleY = (mouse.current.x / 12) + 1;
            }
          }

          bone.scale.y = lerp(bone.scale.y, newScaleY, 0.1);
        }
      } else {
        for (const bone of bones.current) {
          const newScale = lerp(bone.scale.x, 1, 0.1);
          bone.scale.set(newScale, newScale, newScale);
        }
      }
    }
  });

  useEffect(() => {
    const handlePointerMove = ({ x, y }) => {
      if (x > window.innerWidth * 0.2 && x < window.innerWidth * 0.8 && y > window.innerHeight * 0.2 && y < window.innerHeight * 0.8) {
        targetMouse.current.x = (x / window.innerWidth) * 2 - 1;
        targetMouse.current.y = -(y / window.innerHeight) * 2 + 1;
        clearTimeout(idleTimeout.current);
      } else {
        targetMouse.current.x = 0;
        targetMouse.current.y = 0;
      }
      targetMouse.current.x *= 1.5;
      targetMouse.current.y *= 1.5;
    }

    const handleMouseMove = (event) => {
      handlePointerMove({ x: event.clientX, y: event.clientY });
      idleTimeout.current = setTimeout(() => {
        targetMouse.current.x = 0;
        targetMouse.current.y = 0;
      }, 500);
    }
    window.addEventListener('mousemove', handleMouseMove);

    const handleTouchMove = (event) => {
      handlePointerMove({ x: event.touches[ 0 ].clientX, y: event.touches[ 0 ].clientY });
    }
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchMove);

    const handleTouchEnd = () => {
      targetMouse.current.x = 0;
      targetMouse.current.y = 0;
    }
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
  }, []);

  return null;
};

export default LogoLetterAnimationHomepage;