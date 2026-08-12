import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useVideoTexture, Environment, ContactShadows } from '@react-three/drei';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { useEffect } from 'react';
import * as THREE from 'three';

const Model = ({ progress = 0 }: { progress?: number }) => {
  const { scene } = useGLTF('/models/laptop.glb');

  const screen = scene.getObjectByName('Screen_ComputerScreen_0');
  const laptop = scene.getObjectByName('Sketchfab_model');
  const screenContent = scene.getObjectByName('Screen_Texture');

  const texture = useVideoTexture('/htmlanimationWithTabs.mp4', {
    loop: true,
    muted: true,
    playsInline: true,
  });

  const multiplier = 2.8;

  if (laptop) {
    laptop.rotation.z = progress * multiplier;
    laptop.scale.setScalar(15.48);
    laptop.position.x = progress > 0 ? progress * -100 : -10;
  }

  if (screen) {
    const next = (progress * -1) * multiplier;
    screen.rotation.x = Math.max(next, -1.57);
    const next2 = progress * 1.13;
    screen.scale.y = progress > 0.55 ? Math.max(next2, 1.13) : 1;
  }

  useEffect(() => {
    if (!screenContent) return;

    const mesh = screenContent as THREE.Mesh;
    const geometry = mesh.geometry;

    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;

    if (bbox) {
      const positionAttribute = geometry.attributes.position;
      const uvAttribute = geometry.attributes.uv;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);

        const u = 1.0 - (x - bbox.min.x) / (bbox.max.x - bbox.min.x);
        const v = (y - bbox.min.y) / (bbox.max.y - bbox.min.y);

        uvAttribute.setXY(i, u, v);
      }
      uvAttribute.needsUpdate = true;
    }

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true; 
    texture.minFilter = THREE.LinearMipmapLinearFilter; 
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16; 
    
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
    texture.flipY = true;
    texture.needsUpdate = true;

    mesh.material = new THREE.MeshStandardMaterial({
      map: texture,
      toneMapped: false, 
      emissive: new THREE.Color(0xffffff),
      emissiveMap: texture,
      emissiveIntensity: 0.15,
      metalness: 0.1,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    
    mesh.visible = true;

  }, [screenContent, texture]);

  return (
    <primitive
      object={scene}
      scale={0.1}
      rotation={[0, -Math.PI / 7.5, 0]}
    />
  );
};

export default (props: { progress?: number }) => {
  return (
    <div className="w-full h-full -translate-10">
      <Canvas 
        camera={{ position: [3, 10, 37], fov: 92.5 }}
        shadows 
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
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
        <EffectComposer multisampling={8}>
          {/* Usunięto DepthOfField, który tworzył niskiej jakości rozmycie */}
          <Bloom luminanceThreshold={0} luminanceSmoothing={15} height={300} />
          <Noise opacity={0.005} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
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
};

useGLTF.preload('/models/laptop.glb');
// Bez tego HDR startuje dopiero po utworzeniu roota R3F. Klucz cache suspend-react
// jest identyczny z tym, którego użyje <Environment preset="studio" />, więc to
// gwarantowane trafienie w cache, a nie podwójne pobranie.
useEnvironment.preload({ preset: 'studio' });