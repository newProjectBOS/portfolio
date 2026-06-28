import type { ProjectsLinkProps } from './props';
import { useState } from "react";
import { darkTheme, lightTheme } from './themes';

const Tag = (props: any) => {
  const theme = props.isDark ? darkTheme : lightTheme;
  return (
    <>
      {props.newimage ? (
        <span className={theme.tagRenovation}>
          Renowacja
        </span>
      ) : (
        <span className={theme.tagNew}>
          Nowa strona
        </span>
      )}
    </>
  );
};

export default ({ name, link, description, image, newimage, isDark = false }: ProjectsLinkProps & { isDark?: boolean }) => {

  const [hover, setHover] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full h-[420px] rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 group"
    >
      <img
        src={image}
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
          hover ? "scale-105" : "scale-100"
        }`}
      />

      {newimage && (
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{ opacity: hover ? 1 : 0 }}
        >
          <img
            src={newimage}
            alt={`${name} - po`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none">
        <h3 className="text-white text-2xl font-extrabold tracking-tight italic select-none drop-shadow-md">
          {name}
        </h3>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
        <div>
          <Tag newimage={newimage} isDark={isDark} />
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-white/90 text-sm leading-snug max-w-[65%]">
            {description}
          </p>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white text-sm font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 transition-colors whitespace-nowrap"
          >
            Przejdź
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
  );
};