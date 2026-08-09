import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Preload, useEnvironment } from '@react-three/drei';
import SceneReady from '../../loading/SceneReady';

const Model = ({ progress = 0 }: { progress?: number }) => {
  const { scene } = useGLTF('/models/laptop.glb');

  const screen = scene.getObjectByName('Screen_ComputerScreen_0');
  const laptop = scene.getObjectByName('Sketchfab_model');

  const multiplier = 2.8;

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
      {/* dpr domyślnie [1, 2] — na Retinie to 4x pracy fragmentów.
          Brak `shadows`: model wchodzi przez <primitive object={scene}>, a R3F nie
          propaguje castShadow/receiveShadow do surowego grafu, więc mapa cieni
          renderowała się co klatkę i nikt jej nie czytał. Widoczny cień daje
          <ContactShadows>, niezależny od gl.shadowMap. */}
      <Canvas camera={{ position: [0, 3, 13], fov: 60 }} dpr={[1, 1.5]}>
        {/* Światła zostają POZA <Suspense> — gl.compile() w <Preload all />
            wpieka ich liczbę w defines programu, więc muszą być już w scenie. */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={0.9}
          color="#fffced"
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

        {/* fallback={null} jest właściwe — fallbackiem jest overlay <LoadingScreen />.
            Bez tego boundary R3F montuje wewnętrzny <Block>, który rzuca w górę
            obietnicę nigdy się nierozwiązującą i blokuje CAŁY root Reacta na czas
            pobierania GLB i HDR. <Preload all /> musi iść PO <Environment>, bo
            efekty layoutowe rodzeństwa lecą w kolejności drzewa, a scene.environment
            przypisuje dopiero useLayoutEffect Environment. */}
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.1} />

          <Model progress={props.progress} />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={5}
            scale={15}
            blur={5}
            far={1.05}
          />

          <Preload all />
          <SceneReady signal="hero3d" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/laptop.glb');
// Bez tego HDR startuje dopiero po utworzeniu roota R3F. Klucz cache suspend-react
// jest identyczny z tym, którego użyje <Environment preset="studio" />, więc to
// gwarantowane trafienie w cache, a nie podwójne pobranie.
useEnvironment.preload({ preset: 'studio' });