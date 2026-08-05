import { createContext, useContext, Suspense, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, useEnvironment } from "@react-three/drei";
import * as THREE from "three";

// Each <View> only scissor-draws its own rect and never clears the pixels
// it previously occupied, so a view that moves (page scroll) leaves a
// "ghost" behind at its old position. Clearing the whole canvas once per
// frame, before the views render (lower priority = runs first), fixes it.
function CanvasClear() {
  useFrame((state) => {
    state.gl.clear(true, true, true);
  }, -1);
  return null;
}

const EnvTextureContext = createContext<THREE.Texture | null>(null);

export function useSharedEnvTexture() {
  return useContext(EnvTextureContext);
}

// Baking an environment map is a real render pass (6 cube faces). Doing it
// once per icon (10x) stalled the page for seconds on mount; loading it once
// here and sharing it through context is what actually fixes that.
function SharedEnvironment({ children }: { children: ReactNode }) {
  const texture = useEnvironment({ preset: "studio" });
  return <EnvTextureContext.Provider value={texture}>{children}</EnvTextureContext.Provider>;
}

export default function SharedIconCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "default",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <CanvasClear />
      <Suspense fallback={null}>
        <SharedEnvironment>
          <View.Port />
        </SharedEnvironment>
      </Suspense>
    </Canvas>
  );
}
