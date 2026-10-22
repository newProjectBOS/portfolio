import TypewriterText from "../../effects/TypewriterText";
import ScrableText from "../../effects/scrableText";
import team from "./teamMember";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { FiMail } from "react-icons/fi";
import {
  gridVariants,
  cardVariants,
  sectionVariants,
} from "../../effects/motionAnimations";
import UserCard from "./userCard";

const ABOUT_POINTS: ReactNode[] = [
  "Wiemy, że za każdą firmą stoi pomysł, praca i ambicja. Naszym zadaniem jest pomóc Ci przełożyć je na profesjonalną obecność w internecie.",
  "Stawiamy na partnerską współpracę, jasną komunikację i rozwiązania dopasowane do realnych potrzeb. Nie tworzymy stron według jednego schematu. Chcemy zrozumieć, co wyróżnia Twoją firmę, i pokazać to w sposób czytelny dla Twoich klientów.",
  <>
    Jeśli szukasz partnera, który pomoże Ci uporządkować pomysł i przeprowadzi
    Cię przez proces tworzenia strony na WordPressie
    .
  </>,
];

export default () => {
  return (
    <section
      id="aboutUs"
      aria-labelledby="aboutUsTitle"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 selection:bg-blue-100 selection:text-blue-900 sm:py-28 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <h2 id="aboutUsTitle" className="mb-4 text-4xl font-bold text-black">
          <ScrableText text="Poznaj nasz zespół" />
        </h2>
        <hr className="my-6 border-gray-200" />
        <TypewriterText
          text="GrelSites to synergia talentu, kreatywności i zaangażowania, które wykorzystasz dla swojego sukcesu"
          speed={35}
          deleteSpeed={30}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-600"
        />
        <motion.div
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 text-left md:mt-16 md:grid-cols-3 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {ABOUT_POINTS.map((content, index) => (
            <motion.div
              key={index}
              variants={sectionVariants}
              className="relative border-t border-gray-200 pt-6"
            >
              {/* krótki czarny akcent nałożony na szarą linię */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-10 bg-black"
              />
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                {content}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-14 grid grid-cols-1 items-start gap-6 md:mt-16 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {team.map((member) => (
            <motion.div key={member.id} variants={cardVariants as Variants}>
              <UserCard {...member} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={sectionVariants}
        >
          <hr className="mx-auto mb-8 w-24 border-gray-200" />
          <p className="mx-auto max-w-xl text-base text-gray-600">
            Szukasz zespołu, który poprowadzi Twój projekt od pierwszego szkicu
            aż po wdrożenie? Chętnie posłuchamy, co masz w planach.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="#contact">
              <button className="flex items-center justify-center gap-2 px-7 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:scale-95 transition-all hover:cursor-pointer">
                <FiMail size={15} />
                Porozmawiajmy
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
