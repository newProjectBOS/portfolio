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


export default ({ name, link, description, image, newimage, isDark = false }: ProjectsLinkProps & { isDark?: boolean }) => {

  const [hover, setHover] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  return (
    <div
      className={theme.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image image={image} newimage={newimage} name={name} hover={hover} />
      <div className={theme.cardContent}>
        <Tag newimage={newimage} isDark={isDark} />
        <h3 className={theme.cardTitle}>{name}</h3>
        <p className={theme.cardDescription}>{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={theme.cardButton}
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