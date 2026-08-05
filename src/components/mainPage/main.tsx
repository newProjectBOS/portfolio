import TypewriterText from "../../effects/TypewriterText";
import SlideInText from "../../effects/SlideInText";
import { useState, useEffect, useRef } from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

import SecondDiv from "./secondDiv"
import Laptop3D from "../models/laptop"

const DESKTOP = "(min-width: 768px)";

export default () => {
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP).matches
  );
  const [inView, setInView] = useState(true);
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

    // iOS raportuje scrollLeft/scrollTop ułamkowo (device pixel ratio), więc
    // tolerancja 1px potrafiła nie wykryć końca przewijania.
    const EDGE_EPS = 2;

    const atEnd = () =>
      el.scrollLeft + el.clientWidth >= el.scrollWidth - EDGE_EPS;

    // h-[100dvh] podąża za dynamicznym viewportem, a window.innerHeight w
    // Safari na iOS zmienia się inaczej wraz ze zwijaniem paska adresu.
    // Bierzemy mniejszą z wartości, żeby ten test nie migotał w trakcie gestu.
    const viewportHeight = () =>
      Math.min(window.innerHeight, window.visualViewport?.height ?? window.innerHeight);

    const isFullyInView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top <= EDGE_EPS && rect.bottom >= viewportHeight() - EDGE_EPS;
    };

    const panelCanScroll = (delta: number) => {
      if (!atEnd()) return false;
      const max = secondPanel.scrollHeight - secondPanel.clientHeight;
      if (max <= EDGE_EPS) return false;
      return delta > 0
        ? secondPanel.scrollTop < max - EDGE_EPS
        : secondPanel.scrollTop > EDGE_EPS;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isFullyInView()) return;

      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = horizontal ? e.deltaX : e.deltaY;

      if (!horizontal && panelCanScroll(delta)) return;
      if (atEnd() && delta > 0) return;

      e.preventDefault();
      el.scrollLeft += delta;
    };

    // mobile support

    let axis: "x" | "y" | null = null;
    let lastX = 0;
    let lastY = 0;
    // Safari na iOS przypisuje gest jednemu kontenerowi na cały czas jego
    // trwania i nie potrafi "oddać" go w połowie. Dlatego decyzję o
    // przechwyceniu podejmujemy RAZ, przy pierwszym ruchu, i trzymamy się jej
    // aż do puszczenia palca. Wcześniejsze podejmowanie jej przy każdym
    // touchmove powodowało, że po dojechaniu do dołu panelu z ofertami
    // zaczynaliśmy blokować zdarzenia i strona przestawała się przewijać.
    let owned: boolean | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      axis = null;
      owned = null;
    };

    const handleTouchEnd = () => {
      axis = null;
      owned = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = lastX - x;
      const dy = lastY - y;
      lastX = x;
      lastY = y;

      if (axis === null) {
        if (dx === 0 && dy === 0) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";

        const first = axis === "x" ? dx : dy;
        owned =
          isFullyInView() &&
          !(axis === "y" && panelCanScroll(first)) &&
          !(atEnd() && first > 0);
      }

      // Gest należy do przeglądarki — nie dotykamy go do końca.
      if (!owned) return;

      e.preventDefault();
      el.scrollLeft += axis === "x" ? dx : dy;
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
      {/* Tło musi żyć POZA poziomym kontenerem przewijania: w Safari na iOS
          element position:fixed będący dzieckiem kontenera overflow:auto jest
          traktowany jak część jego zawartości i zawyża scrollWidth, przez co
          detekcja końca przewijania nigdy nie zwracała prawdy. */}
      <div className="fixed inset-0 -z-10">
        <img
          src="background.gif"
          className="w-full h-full object-cover bg-black/75"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: Math.min(1, progress * 0.9) }}
        />
      </div>

      <div
        ref={containerRef}
        id="mainPage"
        className="relative flex h-[100dvh] w-full overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ scrollbarWidth: "none" }}
        onScroll={scrollHandler}
      >
        <div className="relative w-full min-w-full max-w-full shrink-0 h-full overflow-hidden pt-24 sm:pt-28 md:pt-32 flex flex-col md:flex-row md:items-end justify-start">
          <div className="order-1 w-full min-w-0 max-w-3xl px-5 sm:px-8 md:px-4 pb-4 sm:pb-6 md:pb-16 lg:pb-24 md:pl-12 lg:pl-24 text-white z-10">
            <SlideInText text="Lorem ipsum" className="text-3xl sm:text-4xl md:text-4xl" />
            <TypewriterText
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
          className="w-full min-w-full max-w-full shrink-0 h-full overflow-y-auto overflow-x-hidden overscroll-y-contain [&::-webkit-scrollbar]:hidden flex flex-col"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            // Mówi Safari wprost, że ten panel obsługuje pionowe przesuwanie
            // natywnie — bez tego iOS potrafi przypisać gest niewłaściwemu
            // kontenerowi i "przykleić" go tam do końca gestu.
            touchAction: "pan-y",
          }}
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
