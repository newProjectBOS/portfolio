import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PerspectiveCamera, Environment, ContactShadows, View } from "@react-three/drei";
import {
  ExtrudedSVG,
  LoopAnimation,
  SmoothControls,
  resolveMaterial,
  type AnimationType,
} from "3dsvg";
import { useSharedEnvTexture } from "./SharedIconCanvas";

function isSvgUrl(value: string) {
  const trimmed = value.trimStart();
  if (trimmed.startsWith("<")) return false;
  return /^(https?:\/\/|\/|\.\/|\.\.\/)/.test(trimmed);
}

function useSvgMarkup(svg: string) {
  const [markup, setMarkup] = useState(() => (isSvgUrl(svg) ? "" : svg));

  useEffect(() => {
    if (!isSvgUrl(svg)) {
      setMarkup(svg);
      return;
    }
    let cancelled = false;
    fetch(svg)
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setMarkup(text);
      })
      .catch(() => {
        if (!cancelled) setMarkup("");
      });
    return () => {
      cancelled = true;
    };
  }, [svg]);

  return markup;
}

interface IconViewProps {
  svg: string;
  color: string;
  smoothness?: number;
  texture?: string;
  textureRepeat?: number;
  textureOffset?: [number, number];
  animate?: AnimationType;
  cursorOrbit?: boolean;
  resetOnIdle?: boolean;
  resetDelay?: number;
  className?: string;
}

export default function IconView({
  svg,
  color,
  smoothness = 0.6,
  texture,
  textureRepeat = 1,
  textureOffset = [0, 0],
  animate = "none",
  cursorOrbit = true,
  resetOnIdle = false,
  resetDelay = 2,
  className = "w-full h-full",
}: IconViewProps) {
  const meshGroupRef = useRef<THREE.Group>(null);
  const animGroupRef = useRef<THREE.Group>(null);
  const svgString = useSvgMarkup(svg);
  const materialSettings = resolveMaterial("default", {});
  const envTexture = useSharedEnvTexture();

  if (!svgString) return <div className={className} />;

  return (
    <View className={className}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <SmoothControls
        rotationX={0}
        rotationY={0}
        meshRef={meshGroupRef}
        cursorOrbit={cursorOrbit}
        orbitStrength={0.15}
        draggable={false}
        scrollZoom={false}
        zoom={8}
        resetOnIdle={resetOnIdle}
        resetDelay={resetDelay}
      />
      <LoopAnimation type={animate} speed={1} reverse={false} meshRef={animGroupRef} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 3, -3]} intensity={0.4} />
      <directionalLight position={[0, -4, 6]} intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={0.3} />
      <group ref={animGroupRef}>
        <ExtrudedSVG
          svgString={svgString}
          depth={1}
          smoothness={smoothness}
          color={color}
          materialSettings={materialSettings}
          rotationX={0}
          rotationY={0}
          groupRef={meshGroupRef}
          texture={texture}
          textureRepeat={textureRepeat}
          textureRotation={0}
          textureOffset={textureOffset}
        />
      </group>
      <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <hemisphereLight args={["#b1e1ff", "#b97a20", 0.5]} />
      {envTexture && <Environment map={envTexture} environmentIntensity={1.5} />}
    </View>
  );
}
