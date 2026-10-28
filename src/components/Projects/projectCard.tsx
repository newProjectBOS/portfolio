import type { ProjectCardProps } from "./props";
import { PLACEHOLDER_IMAGE } from "./props";
import { useCallback, useState } from "react";
import CaseStudyModal from "./caseStudyModal";

export default ({ project }: ProjectCardProps) => {
  const { companyName, url, cardText, technologies, screenshot } = project;
  const name = companyName ?? "";
  const [hover, setHover] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const closeCaseStudy = useCallback(() => setCaseStudyOpen(false), []);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full h-[24rem] md:h-[32rem] xl:h-[38rem] rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 group"
    >
      
      <img
        src={screenshot ?? PLACEHOLDER_IMAGE}
        alt={name}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-[object-position] ${
          screenshot && hover
            ? "object-bottom duration-[6000ms] ease-in-out"
            : "object-top duration-700 ease-out"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 pt-7 flex flex-col items-center gap-2 pointer-events-none">
        <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight select-none drop-shadow-md">
          {name}
        </h3>
        <div className="w-12 h-0.75 rounded-full bg-white/60" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium text-white bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="relative flex items-end">
          <p className="text-white/90 text-sm leading-snug max-w-[65%]">
            {cardText}
          </p>

          <div className="absolute right-0 bottom-0 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCaseStudyOpen(true)}
              aria-label="Zobacz case-study projektu"
              className="flex items-center text-black text-sm font-medium bg-white hover:bg-gray-200 border border-white rounded-full p-2.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span className="max-w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-w-56 group-hover:opacity-100 group-hover:ml-1.5 group-hover:mr-2">
                Zobacz case-study projektu
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="13" y2="17" />
              </svg>
            </button>
            <a
              href={url ?? undefined}
              target="_blank"
              rel="noreferrer"
              aria-label="Przejdź do strony"
              className="flex items-center text-white text-sm font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full p-2.5 transition-colors whitespace-nowrap"
            >
              <span className="max-w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-w-24 group-hover:opacity-100 group-hover:ml-1.5 group-hover:mr-2">
                Przejdź
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <CaseStudyModal
        project={project}
        open={caseStudyOpen}
        onClose={closeCaseStudy}
      />
    </div>
  );
};
