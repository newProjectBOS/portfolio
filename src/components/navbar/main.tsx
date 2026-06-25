"use client";
import { useState, useRef, useEffect } from "react";
import socials from "../../data/socials"

import pages from "../../data/pages";

const socialLinks = [
  { href: socials.instagram.url,    icon: socials.instagram.icon },
  { href: socials.facebook.url,     icon: socials.facebook.icon },
  { href: socials.linkedin.url,     icon: socials.linkedin.icon },
  { href: `mailto:${socials.email.url}`,  icon: socials.email.icon },
  { href: `${socials.phone.url}`,  icon: socials.phone.icon },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 h-20 sm:h-28 md:h-36 bg-linear-to-b from-black/90 to-transparent text-white">
      <div id="MainPage" className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 py-4">

        <div ref={ref} className="relative flex-shrink-0">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white focus:outline-none"
          >
            <span className="flex flex-col gap-0.75">
              <span className={`block h-[1.5px] w-3.75 rounded-full bg-white transition-all duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-3.75 rounded-full bg-white transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-3.75 rounded-full bg-white transition-all duration-300 ${open ? "translate-y-[-4.5px] -rotate-45" : ""}`} />
            </span>
          </button>

          <div
            className={`absolute left-0 top-[calc(100%+6px)] min-w-45 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${open ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}
            style={{ background: "gray-50" }}
          >
            <div className="p-1.5">
              {Object.values(pages).map((page) => (
                <a
                  key={page.id}
                  href={`#${page.id}`}
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-xl px-4 py-2.5 text-left text-[13.5px] text-white/75 whitespace-nowrap transition-colors duration-150 hover:bg-white/10 hover:text-white hover:transition-colors"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 text-center truncate px-2 text-lg sm:text-xl md:text-2xl font-bold">
          GrelSites
        </div>

        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2 md:gap-4">
          {socialLinks.map(({ href, icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-gray-50 text-lg sm:text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white"
            >
              {icon}
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}