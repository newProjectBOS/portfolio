import ScrableText from "../../effects/scrableText";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { gridVariants, sectionVariants } from "../../effects/motionAnimations";
import OFFERT_POINTS from './offertPoints'

export default () => {
  return (
    <section
      id="offertDetails"
      aria-labelledby="offertTitle"
      className="relative overflow-hidden bg-gray-100 py-24 selection:text-blue-900 sm:py-28 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <motion.header
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
        >
          <h2
            id="offertTitle"
            className="mt-4 text-3xl font-bold text-black text-balance sm:text-4xl"
          >
            <ScrableText text="Twoja firma. Nasze rozwiązania. Wspólny cel." />
          </h2>
          <hr className="mx-auto my-8 w-24 border-gray-200" />
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Niezależnie od tego, czy dopiero zaczynasz, czy chcesz odświeżyć
            wizerunek marki – pomożemy Ci zaistnieć w internecie. Projektujemy
            strony dopasowane do Twojej firmy, odbiorców i celów biznesowych.
          </p>
        </motion.header>

        <motion.ul
          className="mt-16 border-b border-gray-200 md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {OFFERT_POINTS.map(({ icon: Icon, title, description }, index) => (
            <motion.li
              key={title}
              variants={sectionVariants}
              className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-gray-200 py-8 sm:gap-x-8 md:grid-cols-[3rem_16rem_1fr_auto] md:items-baseline md:py-10"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="flex items-center gap-3 text-lg font-semibold text-black">
                <Icon
                  aria-hidden="true"
                  size={18}
                  className="shrink-0 text-gray-400 transition-colors group-hover:text-black"
                />
                {title}
              </h3>
              <p className="col-start-2 text-[15px] leading-relaxed text-gray-600 md:col-start-auto">
                {description}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-16 text-center md:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={sectionVariants}
        >
          <p className="mx-auto max-w-xl text-xl text-gray-600">
            Potrzebujesz nowej strony www? Chcesz dostosować sklep do
            podnoszących się oczekiwań klientów? Zapytaj nas, co możemy dla
            Ciebie zrobić!
          </p>
          <div className="mt-10 flex justify-center">
            <a href="#contact">
              <button className="flex items-center justify-center gap-2 px-7 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 active:scale-95 transition-all hover:cursor-pointer">
                <FiMail size={15} />
                Porozmawiajmy!
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
