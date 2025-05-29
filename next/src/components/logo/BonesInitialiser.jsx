import { useEffect, useState } from 'react';

const BonesInitialiser = (props) => {
  const { model, bones } = props;
  const [bonesAreInitialised, setBonesAreInitialised] = useState(false);

  useEffect(() => {
    let raf;

    const traverseModelScene = () => {
      if (model) {
        if (bonesAreInitialised === false) {
          const bonesArray = [];
          setBonesAreInitialised(true);

          model.scene.traverse(
            (child) => {
              if (child.isBone) {
                let vertical;
                let horizontal;

                const id = child.name.replace('Bone', '');
                if (id === '007' || id === '006' || id === '001' || id === '013' || id === '014') {
                  vertical = 0;
                } else if (id === '005' || id === '004' || id === '' || id === '011' || id === '012') {
                  vertical = 1;
                } else if (id === '016' || id === '015' || id === '008' || id === '017' || id === '018') {
                  vertical = 2;
                } else if (id === '020' || id === '019' || id === '023' || id === '024' || id === '021' || id === '022') {
                  vertical = 3;
                }

                if (id === '003') {
                  horizontal = 0;
                } 
                if (id === '002') {
                  horizontal = 1;
                }
                if (id === '009') {
                  horizontal = 2;
                }
                if (id === '010') {
                  horizontal = 3;
                }
                
                bonesArray.push({
                  ...child,
                  vertical: vertical,
                  horizontal: horizontal
                });
              }
            }
          );
          bones.current = [...bonesArray];
        }
      } else {
        raf = requestAnimationFrame(traverseModelScene);
      }
    };

    if (bonesAreInitialised === false) {
      raf = requestAnimationFrame(traverseModelScene);
    }

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [ model, bonesAreInitialised, bones ]);

  return null;
}

export default BonesInitialiser;