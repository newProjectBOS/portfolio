import { useEffect, useRef, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cardVariants } from "../../effects/motionAnimations";
import { TECHS, WHEEL, type Tech } from "./techStack";

const LOGO_SIZE = 64;
const FLIGHT_DISTANCE = 0.65;
const HOLD = 0.3;
const SMOOTHING = 140;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

type TechFlightProps = {
  sectionRef: RefObject<HTMLElement | null>;
  wheelRef: RefObject<HTMLElement | null>;
};

const TechFlight = ({ sectionRef, wheelRef }: TechFlightProps) => {
  const logoRefs = useRef<(HTMLImageElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    const wrapper = wheel?.parentElement;
    const grid = wrapper?.parentElement;
    if (!section || !wheel || !wrapper || !grid) return;

    const slots = TECHS.map((tech) =>
      section.querySelector<HTMLElement>(`[data-tech-slot="${tech.name}"]`),
    );

    const progress = TECHS.map(() => -1);
    let rotation = 0;
    let last = 0;
    let frame = 0;

    const tick = (now: number) => {
      const dt = last ? now - last : 0;
      last = now;
      if (!reduceMotion) rotation += (dt / (WHEEL.duration * 1000)) * Math.PI * 2;
      const follow = 1 - Math.exp(-dt / SMOOTHING);

      const sectionRect = section.getBoundingClientRect();
      const wheelRect = wheel.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scale = wheelRect.width / WHEEL.viewBox;
      const centerX = wheelRect.left + wheelRect.width / 2 - sectionRect.left;
      const centerY = wheelRect.top + wheelRect.height / 2 - sectionRect.top;

      // koło najpierw stoi w całości z ikonami, rozdziela się dopiero po HOLD ekranu scrolla od przyklejenia
      const pinnedScroll = wrapper.getBoundingClientRect().top - grid.getBoundingClientRect().top;
      const gate =
        getComputedStyle(wrapper).position === "sticky"
          ? clamp01((pinnedScroll - viewport * HOLD) / (viewport * FLIGHT_DISTANCE))
          : 1;

      TECHS.forEach((_, index) => {
        const logo = logoRefs.current[index];
        const slot = slots[index];
        if (!logo || !slot) return;

        const angle = (index / TECHS.length) * Math.PI * 2 - Math.PI / 2 + rotation;
        const slotRect = slot.getBoundingClientRect();
        const target = Math.min(
          gate,
          clamp01((viewport - slotRect.top) / (viewport * FLIGHT_DISTANCE)),
        );
        progress[index] =
          progress[index] < 0 ? target : lerp(progress[index], target, follow);
        const t = easeInOut(progress[index]);

        const x = lerp(
          centerX + WHEEL.radius * scale * Math.cos(angle),
          slotRect.left + slotRect.width / 2 - sectionRect.left,
          t,
        );
        const y = lerp(
          centerY + WHEEL.radius * scale * Math.sin(angle),
          slotRect.top + slotRect.height / 2 - sectionRect.top,
          t,
        );
        const size = lerp(WHEEL.iconSize * scale, slotRect.width, t);

        logo.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) scale(${size / LOGO_SIZE})`;
        logo.style.visibility = "visible";
      });
    };

    const loop = (now: number) => {
      tick(now);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [sectionRef, wheelRef, reduceMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {TECHS.map((tech, index) => (
        <img
          key={tech.name}
          ref={(el) => {
            logoRefs.current[index] = el;
          }}
          src={tech.src}
          alt=""
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          className="invisible absolute top-0 left-0 h-16 w-16 origin-top-left will-change-transform"
        />
      ))}
    </div>
  );
};

export const TechSlot = ({ tech }: { tech: Tech }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{
      scale: 1.08,
      y: -6,
      transition: { duration: 0.25, ease: "easeOut" },
    }}
    whileTap={{ scale: 0.96 }}
    className="cursor-pointer"
  >
    <a
      href={tech.href}
      target="_blank"
      rel="noreferrer"
      aria-label={tech.name}
      data-tech-slot={tech.name}
      className="mx-auto block h-16 w-16"
    />
  </motion.div>
);

export default TechFlight;
