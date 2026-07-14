import TypewriterText from "../../effects/TypewriterText";
import SlideInText from "../../effects/SlideInText";
import { useState, useEffect, useRef } from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

import SecondDiv from "./secondDiv"
import Laptop3D from "../models/laptop"

export default () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (atEnd && e.deltaY > 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    // mobile support

    let touchStartY = 0;
    let touchStartScrollLeft = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartScrollLeft = el.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (atEnd && deltaY > 0) return;

      e.preventDefault();
      el.scrollLeft = touchStartScrollLeft + deltaY;
    };
    
    // ----

    el.addEventListener("wheel", handler, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => el.removeEventListener("wheel", handler);
  }, []);

  useEffect(() => {
    const updateProgressFromHash = () => {
      const el = containerRef.current;
      const hash = window.location.hash;

      if (hash === "#mainPage") {
        setProgress(0);
        if (el) el.scrollTo({ left: 0, behavior: "smooth" });
      } else if (hash === "#offert" && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        setProgress(maxScroll > 0 ? 1 : 0);
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      }
    };

    updateProgressFromHash();
    window.addEventListener("hashchange", updateProgressFromHash);
    return () => window.removeEventListener("hashchange", updateProgressFromHash);
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        id="mainPage"
        className="relative flex overflow-x-auto h-screen"
        style={{ scrollbarWidth: "none" }}
        onScroll={scrollHandler}
      >
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

        <div className="relative min-w-full h-screen pt-24 flex items-end justify-start shrink-0">
          <div className="max-w-3xl px-4 pb-100 pl-24 text-white z-10">
            <SlideInText text="Lorem ipsum" />
            <TypewriterText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              speed={50}
              deleteSpeed={30}
              pauseDuration={2000}
              loop={false}
              className="mt-8 text-md font-medium text-white text-2xl md:text-4xl"
              showCursor={true}
            />
            <div className="flex gap-3 mt-10">
              <a href="#contact">
                <button className="flex items-center gap-2 px-7 py-3 bg-white text-black text-sm font-medium rounded-lg border hover:bg-white/5 hover:border-white/70 hover:text-white active:scale-95 transition-all hover:cursor-pointer">
                  <FiMail size={15} />
                  Kontakt
                </button>
              </a>
              <a href="#projects">
                <button className="flex items-center gap-2 px-7 py-3 text-white text-sm font-medium rounded-lg border border-white/30 hover:border-white/70 hover:bg-white/5 active:scale-95 transition-all hover:cursor-pointer">
                  Projekty
                  <FiArrowRight size={15} />
                </button>
              </a>
            </div>
            
          </div>

          <div
            className="absolute right-0 bottom-0 w-[55%] h-[80%] max-w-3xl pointer-events-none"
            style={{
              transform: `translateY(${progress * 150}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <div className="w-full h-full pointer-events-auto w-128 h-128">
              <Laptop3D progress={progress}/>
            </div>
          </div>
        </div>
        <div
          className="min-w-full h-screen flex items-center justify-center shrink-0"
        >
          <div className="text-white">
            <SecondDiv />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-2 bg-white/10 z-50">
        <div
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};