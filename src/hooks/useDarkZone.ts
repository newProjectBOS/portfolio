import { useEffect, useSyncExternalStore, type RefObject } from "react";

// wspólna "ciemna strefa" - sekcje zarejestrowane tym hookiem ściemniają się razem,
// więc przejście między nimi nie miga na jasno
const intersecting = new Set<Element>();
const listeners = new Set<() => void>();
let dark = false;
let observer: IntersectionObserver | null = null;

const recompute = () => {
  const next = intersecting.size > 0;
  if (next === dark) return;
  dark = next;
  listeners.forEach((listener) => listener());
};

const getObserver = () => {
  observer ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      });
      recompute();
    },
    // strefa jest aktywna, gdy przecina środek ekranu
    { threshold: 0, rootMargin: "-50% 0px -50% 0px" },
  );
  return observer;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => dark;

export const useDarkZone = (ref: RefObject<Element | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    obs.observe(el);
    return () => {
      obs.unobserve(el);
      intersecting.delete(el);
      recompute();
    };
  }, [ref]);

  return useSyncExternalStore(subscribe, getSnapshot);
};
