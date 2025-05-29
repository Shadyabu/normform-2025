import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import BonesInitialiser from './BonesInitialiser';
import LogoLetterAnimationHomepage from './LogoLetterAnimationHomepage';
import * as THREE from 'three';

const LogoLetter = ({ letter, isFullscreen, index, material, setMaterial }) => {
  const isDisappeared = useRef(false);
  const isAnimating = useRef(false);
  const animationIsInitialised = useRef(true);
  const model = useGLTF(letter);
  const mesh = useRef(null);
  const targetScale = useRef(0);
  const currentScale = useRef(0);
  const bones = useRef([]);

  useEffect(() => {
    let raf = requestAnimationFrame(() => { });

    const traverseMesh = () => {
      if (model.scene && material) {
        model.scene.traverse(
          (child) => {
            if (child.isMesh && material) {
              child.material = material;
            }
          }
        );
      } else {
        raf = requestAnimationFrame(traverseMesh);
      }
    }

    if (index > 0) {
      raf = requestAnimationFrame(traverseMesh);
    }
      
    return () => {
      cancelAnimationFrame(raf);
    }
  }, [ model, material, index ]);

  useEffect(() => {
    let raf = requestAnimationFrame(() => { });
      const traverseMesh = () => {
        if (model.scene) {
          model.scene.traverse(
            (child) => {
              if (child.isMesh && child.material) {
                const newMaterial = child.material;
                newMaterial.clearcoat = 0;
                newMaterial.roughness = 1;
                newMaterial.reflectivity = 0;
                newMaterial.metalness = 0.05;
                newMaterial.color = new THREE.Color('#ffffff');
                setMaterial(newMaterial);
              }
            }
          );
        } else {
          raf = requestAnimationFrame(traverseMesh);
        }
      }

    if (index === 0) {
      raf = requestAnimationFrame(traverseMesh);
    }
      
    return () => {
      cancelAnimationFrame(raf);
    }
  }, [ model, setMaterial, index ]);

  useEffect(() => {
    let timeout = setTimeout(() => { }, 1);

    if (animationIsInitialised.current === true) {
      isAnimating.current = true;
      timeout = setTimeout(() => {
        targetScale.current = 0;
        timeout = setTimeout(() => {
          targetScale.current = 1;
          timeout = setTimeout(() => {
            isAnimating.current = false;
          }, 120);
        }, 600 + 20 * index);
      }, 30 * index);
    }

    animationIsInitialised.current = true;

    return () => {
      clearTimeout(timeout);
      isAnimating.current = false;
    }
  }, [ isFullscreen, index ]);

  useEffect(() => {
    if (isFullscreen === false) {
      isDisappeared.current = false;
    }
  }, [ isFullscreen ]);

  return (
    <>
      <LogoLetterAnimationHomepage
        targetScale={ targetScale }
        currentScale={ currentScale }
        isDisappeared={ isDisappeared }
        isFullscreen={ isFullscreen }
        bones={ bones }
        mesh={ mesh }
      />
      <mesh ref={ mesh }>
        <primitive object={ model.scene } />
      </mesh>
      <BonesInitialiser bones={ bones } model={ model } />
    </>
  )
}

export default LogoLetter;