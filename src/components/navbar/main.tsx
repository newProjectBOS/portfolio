"use client";
import { useState, useRef, useEffect } from "react";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

const items = [
  { key: "home",      label: "Strona główna", scrollTo: "MainPage" },
  { key: "portfolio",     label: "Portfolio", scrollTo: "Projects" },
  { key: "about", label: "O nas", scrollTo: "AboutUs" },
  { key: "contact",   label: "Kontakt", scrollTo: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com",    icon: <FiInstagram /> },
  { href: "https://facebook.com",     icon: <FiFacebook /> },
  { href: "https://linkedin.com",     icon: <FiLinkedin /> },
  { href: "mailto:test@example.com",  icon: <FiMail /> },
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
    <nav className="fixed top-0 left-0 right-0 w-full z-50 h-36 bg-gradient-to-b from-black/90 via-slate-900/60 to-transparent text-white">
      <div id="MainPage" className="mx-auto relative flex max-w-7xl items-center justify-center px-4 py-4">

        <div ref={ref} className="absolute left-4">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white focus:outline-none"
          >
            <span className="flex flex-col gap-[3px]">
              <span className={`block h-[1.5px] w-[15px] rounded-full bg-white transition-all duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-[15px] rounded-full bg-white transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-[15px] rounded-full bg-white transition-all duration-300 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`} />
            </span>
          </button>

          <div
            className={`absolute left-0 top-[calc(100%+6px)] min-w-[180px] overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${open ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}
            style={{ background: "gray-50" }}
          >
            <div className="p-1.5">
              {items.map(({ key, label, scrollTo }) => (
                <a
                  key={key}
                  href={`#${scrollTo}`}
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-xl px-4 py-2.5 text-left text-[13.5px] text-white/75 whitespace-nowrap transition-colors duration-150 hover:bg-white/10 hover:text-white hover:transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-2xl font-bold">GrelSites</div>

        <div className="absolute right-4 flex items-center gap-4">
          {socialLinks.map(({ href, icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-50 text-xl transition duration-300 transform hover:scale-110 hover:bg-gray-300/20 hover:text-white"
            >
              {icon}
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}