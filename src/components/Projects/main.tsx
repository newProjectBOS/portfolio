import { useState, useRef, useEffect } from "react";
import TypewriterText from "../../effects/TypewriterText";
import ProjectCard from "./projectCard";
import data from "./allProjects";
import type { ProjectsLinkProps } from "./props";
import ScrableText from "../../effects/scrableText";
import { darkTheme, lightTheme } from "./themes";

type Filter = "all" | "new" | "renovation";

export default () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [dark, setDark] = useState(false);
  const watcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setDark(entry.isIntersecting);
    }, { threshold: 0.5 });

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

  return (
    <div className={theme.main} id="projects">
      <div className={theme.header}>
        <ScrableText text="Poznaj nasze projekty" className={theme.title} />
        <hr className={theme.divider} />
        <TypewriterText
          text="Poznaj nasze projekty, które tworzymy z pasją i zaangażowaniem. Każdy z nich to efekt naszej kreatywności i ciężkiej pracy, mający na celu dostarczenie innowacyjnych rozwiązań."
          speed={35}
          loop={false}
          deleteSpeed={30}
          className={theme.description}
        />
      </div>

      <div className={theme.buttonsContainer}>
        <button className={`${theme.buttonBase} ${filter === "all" ? theme.buttonActive : theme.buttonInactive}`} onClick={() => setFilter("all")}>
          Wszystkie
        </button>
        <button className={`${theme.buttonBase} ${filter === "new" ? theme.buttonActive : theme.buttonInactive}`} onClick={() => setFilter("new")}>
          Nowe strony
        </button>
        <button className={`${theme.buttonBase} ${filter === "renovation" ? theme.buttonActive : theme.buttonInactive}`} onClick={() => setFilter("renovation")}>
          Renowacje
        </button>
      </div>

      <div ref={watcherRef} className={theme.grid}>
        {filtered.map((project: ProjectsLinkProps) => (
          <ProjectCard
            key={project.link}
            name={project.name}
            link={project.link}
            description={project.description}
            image={project.image}
            newimage={project.newimage}
            isDark={dark}
          />
        ))}
      </div>
    </div>
  );
};