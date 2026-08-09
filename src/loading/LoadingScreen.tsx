import { useEffect, useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useAppLoading } from "./useAppLoading";

export default function LoadingScreen() {
  const { visible, progress } = useAppLoading();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useLayoutEffect(() => {
    document.getElementById("boot")?.remove();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !visible) return;

    const stop = (e: Event) => e.preventDefault();
    el.addEventListener("wheel", stop, { passive: false });
    el.addEventListener("touchmove", stop, { passive: false });

    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="app-loader"
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label="Ładowanie strony"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: visible ? "auto" : "none" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-black text-white select-none touch-none overscroll-none"
        >
        <motion.img
          src="/logo.png"
          alt="logo"
          className="mb-10 w-40 h-40 object-cover rounded-full shadow-lg shadow-black/40 border border-zinc-700"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          whileHover={{ scale: 1.1 }}
        />

          <div className="w-56 sm:w-72 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="text-xs text-white/40 tabular-nums">
            {Math.round(progress * 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
