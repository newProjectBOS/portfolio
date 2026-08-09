import TypewriterText from "../../effects/TypewriterText";
import SlideInText from "../../effects/SlideInText";
import { useState, useEffect, useRef } from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

import SecondDiv from "./secondDiv"
import Laptop3D from "../models/laptop"
import { useAppReady } from "../../loading/loadingStore"

const DESKTOP = "(min-width: 768px)";

export default () => {
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP).matches
  );
  const [inView, setInView] = useState(true);
  const ready = useAppReady();
  const containerRef = useRef<HTMLDivElement>(null);
  const secondPanelRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  };

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 1),
      { threshold: 1 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    const secondPanel = secondPanelRef.current;
    if (!el || !secondPanel) return;

    const atEnd = () => el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    const isFullyInView: any = () => {
      const rect = el.getBoundingClientRect();
      const viewport = Math.min(window.innerHeight, el.clientHeight);
      return rect.top <= 2 && rect.bottom >= viewport - 2;
    };
    const panelCanScroll = (delta: number) => {
      const max = secondPanel.scrollHeight - secondPanel.clientHeight;
      if (max <= 1) return false;
      return delta > 0 ? secondPanel.scrollTop < max - 1 : secondPanel.scrollTop > 1;
    };

    const targetFor = (delta: number): "track" | "panel" | "page" => {
      if (!atEnd()) return "track";
      if (panelCanScroll(delta)) return "panel";
      if (delta < 0) return "track";
      return "page";
    };

    const applyVertical = (delta: number) => {
      if (!isFullyInView()) {
        window.scrollBy({ top: delta, behavior: "instant" as ScrollBehavior });
        return;
      }
      const target = targetFor(delta);
      if (target === "track") el.scrollLeft += delta;
      else if (target === "panel") secondPanel.scrollTop += delta;
      else window.scrollBy({ top: delta, behavior: "instant" as ScrollBehavior });
    };

    const handleWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = horizontal ? e.deltaX : e.deltaY;

      if (horizontal) {
        if (!isFullyInView()) return;
        e.preventDefault();
        el.scrollLeft += delta;
        return;
      }
      e.preventDefault();
      applyVertical(delta);
    };

    // mobile support

    let axis: "x" | "y" | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let velocity = 0;
    let momentumId = 0;

    const stopMomentum = () => {
      if (momentumId) cancelAnimationFrame(momentumId);
      momentumId = 0;
    };

    const applyDelta = (delta: number) => {
      if (axis === "x") {
        if (isFullyInView()) el.scrollLeft += delta;
      } else {
        applyVertical(delta);
      }
    };

    const startMomentum = () => {
      let v = velocity;
      if (Math.abs(v) < 1) return;
      const step = () => {
        v *= 0.95;
        if (Math.abs(v) < 0.3) {
          momentumId = 0;
          return;
        }
        applyDelta(v);
        momentumId = requestAnimationFrame(step);
      };
      momentumId = requestAnimationFrame(step);
    };

    const handleTouchStart = (e: TouchEvent) => {
      stopMomentum();
      startX = lastX = e.touches[0].clientX;
      startY = lastY = e.touches[0].clientY;
      lastTime = performance.now();
      velocity = 0;
      axis = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      e.preventDefault();

      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = lastX - x;
      const dy = lastY - y;
      lastX = x;
      lastY = y;

      if (axis === null) {
        const totalX = Math.abs(x - startX);
        const totalY = Math.abs(y - startY);
        if (totalX < 4 && totalY < 4) return;
        axis = totalX > totalY ? "x" : "y";
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      lastTime = now;

      const delta = axis === "x" ? dx : dy;
      const v = (delta / dt) * 16;
      velocity = Math.max(-70, Math.min(70, velocity * 0.3 + v * 0.7));

      applyDelta(delta);
    };

    const handleTouchEnd = () => {
      if (axis) startMomentum();
    };

    const handleResize = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    el.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      stopMomentum();
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateProgressFromHash = () => {
      const el = containerRef.current;
      const hash = window.location.hash;

      if (hash === "#mainPage") {
        setProgress(0);
        if (el) el.scrollTo({ left: 0, behavior: "smooth" });
      } else if (hash === "#offert" && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;        setProgress(maxScroll > 0 ? 1 : 0);
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      }
    };

    updateProgressFromHash();
    window.addEventListener("hashchange", updateProgressFromHash);
    return () => window.removeEventListener("hashchange", updateProgressFromHash);
  }, []);

  const actionButtons = (
    <>
      <a href="#contact" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 active:scale-95 transition-all hover:cursor-pointer">
          <FiMail size={15} />
          Kontakt
        </button>
      </a>
      <a href="#projects" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 text-white text-sm font-medium rounded-lg border border-white/30 hover:border-white/70 hover:bg-white/5 active:scale-95 transition-all hover:cursor-pointer">
          Projekty
          <FiArrowRight size={15} />
        </button>
      </a>
    </>
  );

  return (
    <div className="relative -mt-36 overflow-x-hidden">
      <div
        ref={containerRef}
        id="mainPage"
        className="relative flex h-[100dvh] w-full overflow-x-auto overflow-y-hidden overscroll-none"
        style={{ scrollbarWidth: "none" }}
        onScroll={scrollHandler}
      >
        <div className="fixed inset-0 -z-10">
          <img
            src="/background.gif"
            className="w-full h-full object-cover bg-black/75"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: Math.min(1, progress * 0.9) }}
          />
        </div>

        <div className="relative w-full min-w-full max-w-full shrink-0 h-full overflow-hidden pt-24 sm:pt-28 md:pt-32 flex flex-col md:flex-row md:items-end justify-start">
          <div className="order-1 w-full min-w-0 max-w-3xl px-5 sm:px-8 md:px-4 pb-4 sm:pb-6 md:pb-16 lg:pb-24 md:pl-12 lg:pl-24 text-white z-10">
            <SlideInText
              key={`hero-title-${ready}`}
              text="Lorem ipsum"
              className="text-3xl sm:text-4xl md:text-4xl"
            />
            <TypewriterText
              key={`hero-subtitle-${ready}`}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              speed={50}
              deleteSpeed={30}
              pauseDuration={2000}
              loop={false}
              className="mt-5 sm:mt-8 font-medium text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl break-words"
              showCursor={true}
            />
            <div className="hidden md:flex gap-3 mt-7 sm:mt-10">
              {actionButtons}
            </div>
          </div>
          <div
            className="order-2 relative md:absolute right-0 bottom-0 shrink-0 w-full h-[36vh] sm:h-[42vh] md:w-[55%] md:h-[80%] max-w-3xl pointer-events-none my-auto md:my-0"
            style={{
              transform: `translateY(${progress * (isDesktop ? 150 : 40)}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <div className="w-full h-full pointer-events-none md:pointer-events-auto">
              <Laptop3D progress={progress}/>
            </div>
          </div>

          <div className="order-3 md:hidden flex flex-col sm:flex-row gap-3 w-full px-5 sm:px-8 pb-8 z-10">
            {actionButtons}
          </div>
        </div>

        <div
          ref={secondPanelRef}
          className="w-full min-w-full max-w-full shrink-0 h-full overflow-y-auto overflow-x-hidden overscroll-none [&::-webkit-scrollbar]:hidden flex flex-col"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="w-full min-w-0 my-auto text-white py-24 sm:py-28 md:py-40">
            <SecondDiv />
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 w-full h-1.5 sm:h-2 bg-white/10 z-50 transition-opacity duration-300 ${
          inView ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};
