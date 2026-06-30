import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';

const Model = ({ progress = 0 }: { progress?: number }) => {
  const { scene } = useGLTF('/models/laptop.glb');

  const screen = scene.getObjectByName('Screen_ComputerScreen_0');
  const laptop = scene.getObjectByName('RootNode')

  const multiplier = 2.5;

  if (laptop) {
    laptop.rotation.y = progress * multiplier;
  }

  if (screen) {
    const next = (progress * -1) * multiplier;
    screen.rotation.x = Math.max(next, -1.55);
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
      <Canvas camera={{ position: [0, 1, 5], fov: 60 }} shadows>
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={0.9}
          color="#fff7ed"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />

        <directionalLight
          position={[-6, 2, 1]}
          intensity={0.25}
          color="#dceeff"
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

        <Environment preset="studio" environmentIntensity={0.3} />

        <Model progress={props.progress} />

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={2}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/laptop.glb');