import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectRow } from "./props";
import { PLACEHOLDER_IMAGE } from "./props";

const getDomain = (url: string | null) => {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

type CaseStudyModalProps = {
  project: ProjectRow;
  open: boolean;
  onClose: () => void;
};

const CaseStudyModal = ({ project, open, onClose }: CaseStudyModalProps) => {
  const { companyName, url, longText, cardText, technologies, screenshot } = project;
  const name = companyName ?? "";
  const domain = getDomain(url);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${name}`}
          className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto overscroll-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            onClick={onClose}
            aria-label="Zamknij case study"
            className="fixed top-5 right-5 md:top-8 md:right-8 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <motion.div
            className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">
              Case study
            </p>
            <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              {name}
            </h2>
            {cardText && (
              <p className="mt-4 text-lg md:text-2xl font-medium text-white">
                {cardText}
              </p>
            )}
            {technologies && technologies.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-medium text-white bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* zrzut w ramce okna przeglądarki, przewijany ręcznie */}
            <div className="mt-12 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-zinc-900">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                {domain && (
                  <span className="flex-1 min-w-0 truncate text-center text-xs text-white/50 bg-white/5 rounded-md px-3 py-1">
                    {domain}
                  </span>
                )}
              </div>
              <div className="max-h-[70vh] overflow-y-auto overscroll-contain">
                <img
                  src={screenshot ?? PLACEHOLDER_IMAGE}
                  alt={name}
                  className="block w-full h-auto"
                />
              </div>
            </div>

            {longText && (
              <p className="mt-12 max-w-3xl text-lg md:text-xl text-white/80 leading-relaxed whitespace-pre-line">
                {longText}
              </p>
            )}

            {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-12 inline-flex items-center gap-2 px-7 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 active:scale-95 transition-all"
            >
              Odwiedź stronę
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CaseStudyModal;
