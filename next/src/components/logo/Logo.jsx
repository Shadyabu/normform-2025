import { useState } from 'react';
import LogoLetter from './LogoLetter';
const logoModelPaths = [ '/n.glb', '/o1.glb', '/r1.glb', '/m1.glb', '/f.glb', '/o2.glb', '/r2.glb', '/m2.glb' ];

const Logo = () => {

  const [ material, setMaterial ] = useState(null);

  return (
      <group
      position={ [ 0, 0, -120 ] }
      scale={ [ 0.6, 0.6, 0.6 ] }
      >
      <ambientLight intensity={ 2.9 } />
      <directionalLight intensity={ 0.6 } color={ 'white' } position={ [ 0, 120, 200 ] } />
      <directionalLight intensity={ 0.6 } color={ 'white' } position={ [ 20, -12000, 0 ] } />
        {
          logoModelPaths?.map(
            (model, index) => (
              model &&
              <LogoLetter
                letter={ model }
                key={ index }
                isFullscreen={ true }
                index={ index }
                material={material}
                setMaterial={setMaterial}
              />
            )
          )
        }
      </group>
  );
}

export default Logo;