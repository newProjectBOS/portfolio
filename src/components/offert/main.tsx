import ScrableText from "../../effects/scrableText";
import { motion } from "framer-motion";
import { FiImage, FiMail } from "react-icons/fi";
import { useRef } from "react";
import { gridVariants, sectionVariants } from "../../effects/motionAnimations";
import { useDarkZone } from "../../hooks/useDarkZone";
import { darkTheme, lightTheme } from "./themes";
import OFFERT_POINTS from './offertPoints'

export default () => {
  const sectionRef = useRef<HTMLElement>(null);
  const dark = useDarkZone(sectionRef);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <section
      ref={sectionRef}
      id="offertDetails"
      aria-labelledby="offertTitle"
      className={theme.main}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className={theme.glow} />
      </div>

      <div className="relative mx-auto grid w-full max-w-[120rem] gap-16 px-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center lg:px-6 xl:gap-24">
        <div>
          <motion.header
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={sectionVariants}
          >
            <h2
              id="offertTitle"
              className={theme.title}
            >
              <ScrableText text="Twoja firma. Nasze rozwiązania. Wspólny cel." />
            </h2>
            <hr className={theme.divider} />
            <p className={theme.description}>
              Niezależnie od tego, czy dopiero zaczynasz, czy chcesz odświeżyć
              wizerunek marki – pomożemy Ci zaistnieć w internecie. Projektujemy
              strony dopasowane do Twojej firmy, odbiorców i celów biznesowych.
            </p>
          </motion.header>

          <motion.ul
            className={theme.list}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={gridVariants}
          >
            {OFFERT_POINTS.map(({ icon: Icon, title, description }, index) => (
              <motion.li
                key={title}
                variants={sectionVariants}
                className={theme.item}
              >
                <span className={theme.itemIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={theme.itemTitle}>
                  <Icon
                    aria-hidden="true"
                    size={18}
                    className={theme.itemIcon}
                  />
                  {title}
                </h3>
                <p className={theme.itemDescription}>
                  {description}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-16 md:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={sectionVariants}
          >
            <p className={theme.cta}>
              Potrzebujesz nowej strony www? Chcesz dostosować sklep do
              podnoszących się oczekiwań klientów? Zapytaj nas, co możemy dla
              Ciebie zrobić!
            </p>
            <div className="mt-10 flex">
              <a href="#contact">
                <button className={theme.button}>
                  <FiMail size={15} />
                  Porozmawiajmy!
                </button>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <img src = "/example.jpg" className="rounded-3xl shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
};
