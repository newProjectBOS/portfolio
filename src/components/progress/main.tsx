import ScrableText from "../../effects/scrableText";
import { motion } from "framer-motion";
import { gridVariants, sectionVariants } from "../../effects/motionAnimations";

const STEPS = [
  {
    title: "Rozmawiamy o Twoich potrzebach",
    description:
      "Poznajemy Twoją firmę, ofertę, klientów i cele. Ustalamy, jaką funkcję ma pełnić strona, sklep czy aplikacja i jakie informacje powinny się na nich znaleźć.",
  },
  {
    title: "Przygotowujemy koncepcję",
    description:
      "Proponujemy strukturę, kierunek wizualny i rozwiązania dopasowane do charakteru marki. Ustalamy zakres projektu i warunki współpracy.",
  },
  {
    title: "Projektujemy i wdrażamy stronę",
    description:
      "Przekładamy koncepcję na gotową stronę www, sklep internetowy czy aplikację. Dbamy o estetykę, czytelność treści, wygodę użytkowników i prawidłowe działanie strony.",
  },
  {
    title: "Testujemy i publikujemy",
    description:
      "Sprawdzamy działanie najważniejszych elementów, formularzy i wersji mobilnej. Po uzgodnieniu szczegółów przygotowujemy stronę do uruchomienia.",
  },
  {
    title: "Przekazujemy gotową witrynę",
    description:
      "Otrzymujesz stronę, sklep www czy oprogramowanie, które możesz rozwijać wraz ze swoją firmą. Zakres instruktażu i ewentualnej dalszej opieki ustalamy indywidualnie.",
  },
];

export default () => {
  return (
    <section
      id="progress"
      aria-labelledby="progressTitle"
      className="relative overflow-hidden bg-white py-24 selection:text-blue-900 sm:py-28 md:py-32 pt-32 pb-32"
    >
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.header
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
        >
          <h2
            id="progressTitle"
            className="mt-4 text-3xl font-bold text-black text-balance sm:text-4xl"
          >
            <ScrableText text="Od pomysłu do publikacji" />
          </h2>
          <hr className="mx-auto my-8 w-24 border-gray-200" />
          <p className="text-lg font-medium text-black">
            Ty znasz swój biznes. My wiemy, jak pokazać go w internecie.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Tworzenie strony nie musi być skomplikowane. Prowadzimy Cię przez
            kolejne etapy realizacji, wyjaśniamy dostępne rozwiązania i dbamy o
            to, aby efekt końcowy odpowiadał wspólnie ustalonym założeniom.
          </p>
        </motion.header>

        <motion.ol
          className="mt-16 grid gap-x-16 md:mt-20 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {STEPS.map(({ title, description }, index) => (
            <motion.li
              key={title}
              variants={sectionVariants}
              className="group relative flex gap-6 pb-20 last:pb-0 lg:flex-col lg:items-center lg:pb-0 lg:text-center"
            >
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-12 bottom-0 left-6 w-px -translate-x-1/2 bg-black lg:top-6 lg:bottom-auto lg:left-1/2 lg:h-px lg:w-[calc(100%+4rem)] lg:translate-x-0"
                />
              )}
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white transition-transform group-hover:scale-110">
                {index + 1}.
              </span>
              <div className="pt-2.5 lg:pt-6">
                <h3 className="text-lg font-semibold text-black">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
                  {description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};