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

// dzieli tablice na pary [ [0,1], [2,3], ... ]
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
      { threshold: 0.5 },
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
        <hr className={theme.divider} />
      </div>

      <div className="mb-20">
        <TypewriterText
          text="Poznaj nasze projekty, które tworzymy z pasją i zaangażowaniem. Każdy z nich to efekt naszej kreatywności i ciężkiej pracy, mający na celu dostarczenie innowacyjnych rozwiązań."
          speed={35}
          loop={false}
          deleteSpeed={30}
          className={theme.description}
        />
      </div>

      <motion.div
        ref={watcherRef}
        className="mt-6 flex flex-col gap-6 md:gap-8 w-full max-w-[96rem] px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {pairs.map((pair, pairIndex) => (
          <PairRow
            key={pairIndex}
            pair={pair}
            dark={dark}
          />
        ))}
      </motion.div>
    </div>
  );
};

// pojedynczy rzōnd z 2 kaflami - harmonijka
function PairRow({
  pair,
  dark,
}: {
  pair: ProjectsLinkProps[];
  dark: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full">
      {pair.map((project, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered =
          hoveredIndex !== null && hoveredIndex !== index;

        return (
          <motion.div
            key={project.link ?? index}
            variants={cardVariants as any}
            className="cursor-pointer"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            animate={{
              flexGrow: isHovered ? 1.15 : isOtherHovered ? 0.85 : 1,
              scale: isHovered ? 1.015 : 1,
            }}
            transition={{
              flexGrow: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
              scale: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
            style={{ flexBasis: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProjectCard
              name={project.name}
              link={project.link}
              description={project.description}
              image={project.image}
              newimage={project.newimage}
              isDark={dark}
            />
          </motion.div>
        );
      })}
    </div>
  );
}