import { useState } from "react";
import TypewriterText from "../../effects/TypewriterText";
import ProjectCard from "./projectCard";
import data from "./allProjects";
import type { ProjectsLinkProps } from "./props";
import ScrableText from "../../effects/scrableText";

type Filter = "all" | "new" | "renovation";

export default () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = data.filter((project: ProjectsLinkProps) => {
    if (filter === "new") return !project.newimage;
    if (filter === "renovation") return project.newimage;
    return true;
  });

  const btnBase = "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors";
  const active = "bg-gray-800 text-white border-gray-800";
  const inactive = "bg-white text-gray-600 border-gray-200 hover:border-gray-400";

  return (
    <div className="bg-gray-100 min-h-[60vh] flex flex-col items-center justify-center px-4 py-24" id = "projects">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <ScrableText text="Poznaj nasze projekty" className="text-4xl font-bold mb-4 text-black" />
        <hr className="my-6 border-gray-200" />
        <TypewriterText
          text="Poznaj nasze projekty, które tworzymy z pasją i zaangażowaniem. Każdy z nich to efekt naszej kreatywności i ciężkiej pracy, mający na celu dostarczenie innowacyjnych rozwiązań."
          speed={35}
          loop={false}
          deleteSpeed={30}
          className="mt-8 text-gray-600 text-lg"
        />
      </div>

      <div className="flex gap-2 mt-10">
        <button className={`${btnBase} ${filter === "all" ? active : inactive} cursor-pointer`} onClick={() => setFilter("all")}>
          Wszystkie
        </button>
        <button className={`${btnBase} ${filter === "new" ? active : inactive} cursor-pointer`} onClick={() => setFilter("new")}>
          Nowe strony
        </button>
        <button className={`${btnBase} ${filter === "renovation" ? active : inactive} cursor-pointer`} onClick={() => setFilter("renovation")}>
          Renowacje
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6 w-full max-w-5xl">
        {filtered.map((project: ProjectsLinkProps) => (
          <ProjectCard
            key={project.link}
            name={project.name}
            link={project.link}
            description={project.description}
            image={project.image}
            newimage={project.newimage}
          />
        ))}
      </div>
    </div>
  );
};