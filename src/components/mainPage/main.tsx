import TypewriterText from "../../effects/TypewriterText";
import SlideInText from "../../effects/SlideInText";
import { useState, useEffect, useRef } from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

import SecondDiv from "./secondDiv"

export default () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  };

  console.log(progress);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (atEnd && e.deltaY > 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
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
                <button className="flex items-center gap-2 px-7 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 active:scale-95 transition-all hover:cursor-pointer">
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
            className="absolute bottom-0 right-0"
            style={{
              transform: `translateY(${progress * 150}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
          </div>
          {/* <img src="assets/laptop.png" className="w-full" /> */}
        </div>
        <div
          className="min-w-full h-screen flex items-center justify-center shrink-0"
          id="projects"
        >
          <div className="text-white">
            <SecondDiv/>
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