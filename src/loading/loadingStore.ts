import { useSyncExternalStore } from "react";

export type LoadingSignal = "hero3d" | "heroImage" | "fonts";

const REQUIRED: readonly LoadingSignal[] = ["hero3d", "heroImage", "fonts"];

type Snapshot = { done: number; total: number; complete: boolean };

const done = new Set<LoadingSignal>();
const listeners = new Set<() => void>();

let snapshot: Snapshot = { done: 0, total: REQUIRED.length, complete: false };

const recompute = () => {
  const count = REQUIRED.filter((signal) => done.has(signal)).length;
  const complete = count === REQUIRED.length;
  if (count === snapshot.done && complete === snapshot.complete) return;
  snapshot = { done: count, total: REQUIRED.length, complete };
  listeners.forEach((listener) => listener());
};

export const markReady = (signal: LoadingSignal) => {
  if (done.has(signal)) return;
  done.add(signal);
  recompute();
};

export const forceComplete = () => {
  REQUIRED.forEach((signal) => done.add(signal));
  recompute();
};

export const subscribeLoading = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getLoadingSnapshot = () => snapshot;

export const useAppReady = () =>
  useSyncExternalStore(subscribeLoading, getLoadingSnapshot, getLoadingSnapshot)
    .complete;
