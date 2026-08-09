import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { markReady, type LoadingSignal } from "./loadingStore";

export default function SceneReady({
  signal,
  frames = 3,
}: {
  signal: LoadingSignal;
  frames?: number;
}) {
  const count = useRef(0);

  useFrame(() => {
    if (count.current > frames) return;
    if (++count.current > frames) markReady(signal); 
  });

  return null;
}
