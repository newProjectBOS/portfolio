import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectsLinkProps } from "./props";

type CaseStudyModalProps = {
  project: ProjectsLinkProps;
  open: boolean;
  onClose: () => void;
};

const CaseStudyModal = ({ project, open, onClose }: CaseStudyModalProps) => {
  const { name, link, description, image, newimage } = project;

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
              Case study · {newimage ? "Renowacja" : "Nowa strona"}
            </p>
            <h2 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              {name}
            </h2>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
              {description}
            </p>

            <div className={`mt-12 grid gap-6 ${newimage ? "md:grid-cols-2" : ""}`}>
              <figure>
                <img
                  src={image}
                  alt={newimage ? `${name} - przed` : name}
                  className="w-full aspect-[16/10] object-cover rounded-2xl ring-1 ring-white/10"
                />
                {newimage && (
                  <figcaption className="mt-3 text-sm text-white/50">Przed</figcaption>
                )}
              </figure>
              {newimage && (
                <figure>
                  <img
                    src={newimage}
                    alt={`${name} - po`}
                    className="w-full aspect-[16/10] object-cover rounded-2xl ring-1 ring-white/10"
                  />
                  <figcaption className="mt-3 text-sm text-white/50">Po</figcaption>
                </figure>
              )}
            </div>

            <a
              href={link}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CaseStudyModal;
