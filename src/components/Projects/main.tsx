import { useState, useRef, useEffect } from "react";
import TypewriterText from "../../effects/TypewriterText";
import ProjectCard from "./projectCard";
import data from "./allProjects";
import type { ProjectsLinkProps } from "./props";
import ScrableText from "../../effects/scrableText";
import { darkTheme, lightTheme } from "./themes";
import { gridVariants, cardVariants } from "../../effects/motionAnimations";
import { motion } from "framer-motion";

type Filter = "all" | "new" | "renovation";

function chunkIntoPairs<T>(arr: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push(arr.slice(i, i + 2));
  }
  return pairs;
}

export default () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [dark, setDark] = useState(false);
  const watcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setDark(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    if (watcherRef.current) {
      observer.observe(watcherRef.current);
    }

    return () => {
      if (watcherRef.current) {
        observer.unobserve(watcherRef.current);
      }
    };
  }, []);

  const filtered = data.filter((project: ProjectsLinkProps) => {
    if (filter === "new") return !project.newimage;
    if (filter === "renovation") return project.newimage;
    return true;
  });

  const theme = dark ? darkTheme : lightTheme;
  const pairs = chunkIntoPairs(filtered);

  return (
    <div className={theme.main} id="projects">
      <div className={theme.header}>
        <ScrableText text="Poznaj nasze projekty" className={theme.title} />
        <div className="flex justify-center mt-4">
          <hr className={theme.divider + " w-16 border-t-2"} />
        </div>
      </div>

      <div className="mb-12 sm:mb-20 max-w-2xl mx-auto text-center px-4">
        <TypewriterText
          text="Poznaj nasze projekty, które tworzymy z pasją i zaangażowaniem. Każdy z nich to efekt naszej kreatywności i ciężkiej pracy, mający na celu dostarczenie innowacyjnych rozwiązań."
          speed={35}
          loop={false}
          deleteSpeed={30}
          className={theme.description}
        />
      </div>

      <div ref={watcherRef} className="w-full">
        <div className="md:hidden w-full">
          <ProjectsSlider projects={filtered} dark={dark} />
        </div>

        <motion.div
          className="hidden md:flex mt-6 flex-col gap-6 md:gap-8 w-full max-w-[140rem] mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {pairs.map((pair, pairIndex) => (
            <PairRow key={pairIndex} pair={pair} dark={dark} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

function ProjectsSlider({
  projects,
  dark,
}: {
  projects: ProjectsLinkProps[];
  dark: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        children.forEach((child, i) => {
          const childCenter = child.offsetLeft + child.clientWidth / 2;
          const dist = Math.abs(childCenter - center);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        setActive(closest);
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [projects.length]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({
      left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-[8vw] pb-2 no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((project, index) => (
          <div
            key={project.link ?? index}
            className="snap-center shrink-0 w-[84vw] sm:w-[70vw] transition-transform duration-300"
            style={{
              transform: active === index ? "scale(1)" : "scale(0.94)",
              opacity: active === index ? 1 : 0.55,
            }}
          >
            <ProjectCard
              name={project.name}
              link={project.link}
              description={project.description}
              image={project.image}
              newimage={project.newimage}
              isDark={dark}
              isHovered={active === index}
            />
          </div>
        ))}
      </div>

      <button
        aria-label="Poprzedni projekt"
        onClick={() => scrollToIndex(Math.max(active - 1, 0))}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-30"
        disabled={active === 0}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        aria-label="Następny projekt"
        onClick={() => scrollToIndex(Math.min(active + 1, projects.length - 1))}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-30"
        disabled={active === projects.length - 1}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button
            key={index}
            aria-label={`Przejdź do projektu ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === index ? "w-6 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PairRow({ pair, dark }: { pair: ProjectsLinkProps[]; dark: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
      {pair.map((project, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <motion.div
            key={project.link ?? index}
            variants={cardVariants as any}
            className="flex"
            style={{ flexBasis: 0 }}
            animate={{
              flexGrow: isHovered ? 1.05 : isOtherHovered ? 0.88 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 1,
            }}
          >
            <motion.div
              className="cursor-pointer relative w-full"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectCard
                name={project.name}
                link={project.link}
                description={project.description}
                image={project.image}
                newimage={project.newimage}
                isDark={dark}
                isHovered={isHovered}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}