import TypewriterText from "../../effects/TypewriterText";
import ProjectCard from "./projectCard";
import data from "./allProjects";
import type { ProjectsLinkProps } from "./props";

export default () => {
  return (
    <div className="bg-gray-100 min-h-[60vh] flex flex-col items-center justify-center px-4 py-24">
      <h1 className="text-4xl font-bold text-gray-800">Projekty</h1>
      <hr />
      <TypewriterText
        text="Odkryj nasze wspaniałe projekty"
        className="text-gray-400"
      />
      <div className="mt-10 grid grid-cols-3 gap-6">
        {data.map((project: ProjectsLinkProps) => (
          <ProjectCard
            key={project.link}
            name={project.name}
            link={project.link}
            description={project.description}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
};