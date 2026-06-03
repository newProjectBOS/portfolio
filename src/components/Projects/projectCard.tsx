import type { ProjectsLinkProps } from './props';
import { useState } from "react";

const Tag = (props: any) => {
  return (
    <>
      {props.newimage ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-800 px-3 py-1 rounded-full mb-3">
          Renowacja
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full mb-3">
          Nowa strona
        </span>
      )}
    </>
  );
};

const Image = ({
  image,
  newimage,
  name,
  hover,
}: {
  image: string;
  newimage?: string;
  name: string;
  hover: boolean;
}) => {
  if (!newimage) {
    return <img src={image} alt={name} className="w-full h-48 object-cover brightness-55 hover:brightness-100" />;
  }

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <img
        src={image}
        alt={`${name} - przed`}
        className="absolute inset-0 w-full h-48 object-cover"
      />
      <div
        className="absolute inset-0 transition-all duration-500 ease-in-out origin-left"
        style={{ clipPath: hover ? "inset(0 100% 0 0)" : "inset(0 0% 0 0)" }}
      >
        <img src={newimage} alt={`${name} - po`} className="w-full h-48 object-cover brightness-55" />
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md transition-all duration-500 ease-in-out"
        style={{ left: hover ? "0%" : "100%" }}
      />
      <span
        className="absolute bottom-2 left-2 text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded transition-opacity duration-300"
        style={{ opacity: hover ? 1 : 0 }}
      >
        PRZED
      </span>
      <span
        className="absolute bottom-2 right-2 text-xs font-semibold bg-black/50 text-white px-2 py-0.5 rounded transition-opacity duration-300"
        style={{ opacity: hover ? 0 : 1 }}
      >
        PO
      </span>
    </div>
  );
};


export default ({ name, link, description, image, newimage }: ProjectsLinkProps) => {

  const [hover, setHover] = useState(false);
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden w-80 font-sans
             transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
             hover:scale-105 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image image={image} newimage={newimage} name={name} hover={hover} />
      <div className="p-5">
        <Tag newimage={newimage} />
        <h3 className="text-base font-medium text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-800 border border-blue-300 rounded-lg px-3.5 py-1.5 hover:bg-purple-50 transition-colors"
        >
          Przejdź
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