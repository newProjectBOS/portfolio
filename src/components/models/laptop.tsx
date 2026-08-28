import { Canvas } from '@react-three/fiber';
import { useGLTF, useVideoTexture, Environment, ContactShadows } from '@react-three/drei';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { useEffect } from 'react';
import * as THREE from 'three';

const Model = ({ progress = 0 }: { progress?: number }) => {
  const { scene } = useGLTF('/models/laptop4.glb');

  const texture = useVideoTexture('/htmlanimationWithTabs.mp4', {
    loop: true,
    muted: true,
    playsInline: true,
  });

  const connector = scene.getObjectByName('Connector');
  const screen = scene.getObjectByName('Screen');
  const blackFrame = scene.getObjectByName('Black_Frame');
  const blackFrame2 = scene.getObjectByName('Black_Frame_2');
  const top = scene.getObjectByName('Top');

  const screenParts = [connector, screen, blackFrame, blackFrame2, top].filter(Boolean) as THREE.Object3D[];
  const laptop = scene.getObjectByName('Laptop');

  const multiplier = 2.8;
  const MAX_ANGLE = 1.96;

  if (laptop) {
    laptop.rotation.z = progress * multiplier;
    laptop.scale.setScalar(15.48);
    laptop.position.x = progress > 0 ? progress * -100 : -10;
  }

  if (screenParts.length > 0) {
    screenParts.forEach((part) => {
      if (part) {
        let angle = progress * multiplier;
        if (angle > MAX_ANGLE) angle = MAX_ANGLE;
        part.rotation.x = angle;
        const next2 = progress * 1.13;
        part.scale.y = progress > 0.55 ? Math.max(next2, 1.13) : 1;
      }
    });
  } else {
    let angle = progress * multiplier;
    if (angle > MAX_ANGLE) angle = MAX_ANGLE;
    scene.rotation.x = angle;
    scene.scale.y = progress > 0.55 ? 1 + (progress - 0.55) * 0.3 : 1;
  }

  // NOWE: nadaj realistyczne materiały korpusowi laptopa (aluminium) + cienie na całym modelu
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Pomiń ekran - ten dostaje osobny materiał niżej
        if (mesh === screen) return;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.isMeshStandardMaterial) {
          // Wygładzone, lekko metaliczne aluminium zamiast płaskiego/ciemnego materiału
          mat.metalness = Math.max(mat.metalness ?? 0, 0.6);
          mat.roughness = Math.min(mat.roughness ?? 1, 0.35);
          mat.envMapIntensity = 1.4;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene, screen]);

  useEffect(() => {
    if (!screen) return;

    const mesh = screen as THREE.Mesh;
    const geometry = mesh.geometry;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;

    if (bbox) {
      const positionAttribute = geometry.attributes.position;
      const uvAttribute = geometry.attributes.uv;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);

        const u = (x - bbox.min.x) / (bbox.max.x - bbox.min.x);
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
      emissiveIntensity: 0.4, // podbite, żeby ekran realnie "świecił" w ciemnym otoczeniu
      metalness: 0,
      roughness: 0.15,
      side: THREE.DoubleSide,
    });

    mesh.castShadow = false;
    mesh.visible = true;
  }, [screen, texture]);

  return (
    <primitive
      object={scene}
      scale={4.4}
      position={[-1.5, -1.6, -10]}
      rotation={[0, -Math.PI / 7.5, 0]}
    />
  );
};

export default (props: { progress?: number }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 6, 30], fov: 42 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
          alpha: true,
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.35} color="#404060" />

        <directionalLight
          position={[15, 20, 10]}
          intensity={0.06}
          color="#ffeedd"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />

          <orthographicCamera
            attach="shadow-camera"
            args={[-15, 15, 15, -15, 1, 60]}
          />

        <directionalLight
          position={[-15, 5, -10]}
          intensity={0.1}
          color="#5599ff"
        />

        <directionalLight
          position={[-10, -5, -20]}
          intensity={0.6}
          color="#8888ff"
        />

        {/* Światło odbite od "ekranu", żeby korpus łapał niebieskawy blask */}
        <pointLight
          position={[0, 1.5, 4]}
          intensity={0.6}
          color="#66aaff"
          distance={12}
        />

        <Environment preset="city" background={false} environmentIntensity={0.8} />

        <Model progress={props.progress} />

        <ContactShadows
          position={[-1.5, -2.6, -10]}
          opacity={0.75}
          scale={10}
          blur={2}
          far={4}
          resolution={1024}
          color="#000000"
        />

        <EffectComposer>
          <Bloom
            intensity={0.18}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.85}
            height={300}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
          <Noise opacity={0.035} blendFunction={THREE.MultiplyBlending} blendingMode={1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/laptop4.glb');