import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';

const Model = ({ progress = 0 }: { progress?: number }) => {
  const { scene } = useGLTF('/models/laptop.glb');

  const screen = scene.getObjectByName('Screen_ComputerScreen_0');
  const laptop = scene.getObjectByName('Sketchfab_model');

  const multiplier = 2.8;

  console.log(progress);

  if (laptop) {
    laptop.rotation.z = progress * multiplier;
    laptop.scale.setScalar(3.5);
    laptop.position.x = -10;
  }

  if (screen) {
    const next = (progress * -1) * multiplier;
    screen.rotation.x = Math.max(next, -1.57);
    const next2 = progress * 1.13;
    
    if (progress > 0.35) {
      screen.scale.y = Math.max(next2, 1.13);
    }
    else {
      screen.scale.y = 1
    }

  }

  return (
    <primitive
      object={scene}
      scale={0.1}
      rotation={[0, -Math.PI / 7.5, 0]}
    />
  );
}

export default (props: { progress?: number }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 3, 13], fov: 60 }} shadows>
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={0.9}
          color="#fffced"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />

        <directionalLight
          position={[-6, 2, 1]}
          intensity={1.25}
          color="#ffdcdc"
        />
        
        <spotLight
          position={[-2, 4, -6]}
          angle={0.5}
          penumbra={0.8}
          intensity={0.8}
          color="#a8d8ff"
        />

        <spotLight
          position={[3, 3, -4]}
          angle={0.45}
          penumbra={0.8}
          intensity={0.5}
          color="#ffd9a8"
        />

        <Environment preset="studio" environmentIntensity={0.1} />

        <Model progress={props.progress} />

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={5}
          scale={15}
          blur={5}
          far={1.05}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/laptop.glb');