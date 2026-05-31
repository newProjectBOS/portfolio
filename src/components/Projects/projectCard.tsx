import type { ProjectsLinkProps } from './props';

export default ({ name, link, description, image }: ProjectsLinkProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-80 font-sans">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover bg-gray-100"
      />
      <div className="p-5">
        <h3 className="text-base font-medium text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-800 border border-blue-300 rounded-lg px-3.5 py-1.5 hover:bg-purple-50 transition-colors"
        >
          Przejdź do projektu
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
};