import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useProgress } from "@react-three/drei";
import {
  forceComplete,
  getLoadingSnapshot,
  markReady,
  subscribeLoading,
} from "./loadingStore";

const MIN_MS = 900;
const MAX_MS = 8000;
const PACE_MS = 4000;

export function useAppLoading() {
  const signals = useSyncExternalStore(
    subscribeLoading,
    getLoadingSnapshot,
    getLoadingSnapshot
  );

  const { progress: threeProgress } = useProgress();

  const [, tick] = useState(0);
  const shown = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) markReady("heroImage");
    };

    const img = new Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = "/background.gif";
    img.decode?.().then(finish, finish);

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  useEffect(() => {
    if (!document.fonts) {
      markReady("fonts");
      return;
    }
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) markReady("fonts");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const remaining = Math.max(0, MAX_MS - performance.now());
    const id = setTimeout(forceComplete, remaining);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!signals.complete) return;
    const remaining = MIN_MS - performance.now();
    if (remaining <= 0) return;
    const id = setTimeout(() => tick((n) => n + 1), remaining);
    return () => clearTimeout(id);
  }, [signals.complete]);

  useEffect(() => {
    if (signals.complete) return;
    const id = setInterval(() => tick((n) => n + 1), 120);
    return () => clearInterval(id);
  }, [signals.complete]);

  const elapsed = performance.now();
  const visible = !(signals.complete && elapsed >= MIN_MS);

  const byAsset = signals.done / signals.total;
  const byThree = Math.min(1, Math.max(0, threeProgress / 100));
  const byTime = Math.min(0.9, elapsed / PACE_MS);
  const target = visible
    ? Math.min(0.99, Math.max(byAsset, byTime, byAsset * 0.5 + byThree * 0.5))
    : 1;

  shown.current = Math.max(shown.current, target);

  return { visible, progress: shown.current };
}
