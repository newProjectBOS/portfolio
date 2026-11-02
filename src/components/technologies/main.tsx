"use client";
import ScrableText from "../../effects/scrableText";
import TypewriterText from "../../effects/TypewriterText";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  sectionVariants,
  gridVariants,
} from "../../effects/motionAnimations.tsx";
import TechBackground from "./techBackground.tsx";
import TechOrbit from "./techOrbit.tsx";
import TechFlight, { TechSlot } from "./techFlight.tsx";
import { TECHS } from "./techStack.ts";

export default () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} id="technologies" className="relative bg-white px-4 py-20 overflow-clip">
      <TechBackground />
      <TechFlight sectionRef={sectionRef} wheelRef={wheelRef} />

      <div className="relative z-10 mx-auto grid w-full max-w-[120rem] gap-16 px-3 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-20 lg:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,40rem)] 2xl:grid-cols-[minmax(0,1fr)_minmax(0,46rem)]">
        {/* koło przyklejone pod navbarem (h-36) i wyśrodkowane w reszcie ekranu */}
        <div className="md:order-2 md:sticky md:top-36 md:flex md:h-[calc(100vh-9rem)] md:items-center md:self-start">
          <motion.div
            ref={wheelRef}
            className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-[min(100%,calc(100vh-13rem))]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TechOrbit className="block h-auto w-full" />
          </motion.div>
        </div>

        <div className="md:order-1">
          {/* wstęp zajmuje cały ekran obok koła - najpierw widać całe koło, a rozdziela się dopiero przy Frontendzie */}
          <div className="md:flex md:min-h-[calc(100vh-9rem)] md:flex-col md:justify-center">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScrableText
                text="Technologie, które napędzają nasze projekty"
                className="text-4xl font-bold mb-4 text-black"
              />
            </motion.div>

            <motion.hr
              className="my-6 border-gray-200"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <TypewriterText
                text="Od Front-endu (warstwy widoku) po back-end (oprogramowanie) korzystamy z najnowszych technologii aby dostarczyć Twojej firmie innowacyjne rozwiązania"
                speed={35}
                deleteSpeed={30}
                className="mt-8 text-gray-600 text-lg"
              />
            </motion.div>
          </div>

          <motion.div
            className="mt-30"
            variants={sectionVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h3 className="text-2xl font-semibold text-black mb-6">
              Frontend (warstwa wizualna)
            </h3>
            <p className="text-md text-gray-700 mb-4 max-w-2xl">
              Nowoczesny front-end to połączenie estetyki, szybkości i
              funkcjonalności. Wykorzystujemy React, TypeScript i Tailwind CSS,
              bazując na sprawdzonych standardach webowych i dokumentacji MDN. W
              ten sposób tworzymy responsywne, intuicyjne i dopracowane w każdym
              detalu strony internetowe, sklepy i aplikacje.
            </p>
            <motion.hr
              className="my-6 w-1/3 border-gray-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {TECHS.filter((tech) => tech.group === "frontend").map((tech) => (
                <TechSlot key={tech.name} tech={tech} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-30"
            variants={sectionVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h3 className="text-2xl font-semibold text-black mb-6">
              Backend (strona techniczna)
            </h3>
            <p className="text-md text-gray-700 mb-4 max-w-2xl">
              Tworzymy wydajne i bezpieczne zaplecze stron internetowych,
              wykorzystując Node.js i Express.js do budowy logiki aplikacji oraz
              obsługi komunikacji z serwerem. MongoDB odpowiada za elastyczne
              przechowywanie danych, a Redis wspiera szybki dostęp do informacji i
              optymalizację wydajności. Dzięki temu projektujemy rozwiązania,
              które są skalowalne, niezawodne i gotowe na rozwój Twojego biznesu.
            </p>
            <motion.hr
              className="my-6 w-1/3 border-gray-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {TECHS.filter((tech) => tech.group === "backend").map((tech) => (
                <TechSlot key={tech.name} tech={tech} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-30"
            variants={sectionVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h3 className="text-2xl font-semibold text-black mb-6">
              CMS - wygodne zarządzanie treścią i sprzedażą
            </h3>
            <p className="text-md text-gray-700 mb-4 max-w-2xl">
              Tworzymy strony internetowe i sklepy online oparte na WordPressie i
              WooCommerce, które łączą intuicyjną obsługę z szerokimi
              możliwościami rozwoju. Dzięki tym rozwiązaniom możesz samodzielnie
              aktualizować treści, zarządzać ofertą i produktami oraz rozwijać
              sprzedaż online bez konieczności ingerowania w kod strony.
            </p>
            <motion.hr
              className="my-6 w-1/3 border-gray-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {TECHS.filter((tech) => tech.group === "cms").map((tech) => (
                <TechSlot key={tech.name} tech={tech} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
