import ScrableText from "../../effects/scrableText";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FiArrowRight,
  FiFlag,
  FiMapPin,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { gridVariants, sectionVariants } from "../../effects/motionAnimations";

type Note = {
  icon: IconType;
  title: string;
  description: string[];
  paper: string;
  rotate: number;
  tape: string;
  link?: { href: string; label: string };
};

const NOTES: Note[] = [
  {
    icon: FiZap,
    title: "Młoda energia, świeże spojrzenie i konkretne cele.",
    description: [
      "GrelSites tworzy młody, ambitny zespół ludzi, którzy doskonale odnajdują się w świecie internetu i nowoczesnych technologii. Łączymy kreatywność, wiedzę i zaangażowanie, nieustannie poszukując rozwiązań, które odpowiadają na zmieniające się potrzeby rynku. Do każdego projektu podchodzimy indywidualnie, ponieważ wiemy, że za każdą firmą stoi inna historia, pomysł i wizja rozwoju.",
    ],
    paper: "from-yellow-100 to-yellow-200/80",
    rotate: -2.5,
    tape: "left-1/2 -translate-x-1/2 -rotate-2",
  },
  {
    icon: FiMapPin,
    title: "Wspieramy tych, którzy tworzą lokalny biznes.",
    description: [
      "Naszą działalność budujemy z myślą o lokalnych przedsiębiorcach. Chcemy dawać szansę osobom, które dopiero rozpoczynają swoją przygodę z biznesem, pomagając im postawić pierwsze kroki w internecie i profesjonalnie zaprezentować swoją markę.",
      "Równie ważne miejsce zajmują dla nas firmy rodzinne oraz przedsiębiorstwa, które od wielu lat budują swoją pozycję na rynku. Wiemy, ile pracy, zaangażowania i historii kryje się za takimi biznesami. Wierzymy, że nowoczesna obecność w internecie może pomóc im utrzymać konkurencyjność, dotrzeć do młodszego pokolenia klientów i zdobywać kolejne rynki, nie tracąc przy tym swojej tożsamości i wartości.",
    ],
    paper: "from-rose-100 to-rose-200/70",
    rotate: 1.8,
    tape: "left-8 rotate-3",
  },
  {
    icon: FiTrendingUp,
    title: "Nie tylko tworzymy strony. Pomagamy rozwijać biznes.",
    description: [
      "Zależy nam na czymś więcej niż estetyczny wygląd witryny. Każdy projekt traktujemy jako narzędzie, które ma wspierać konkretne cele biznesowe. Stawiamy na nowoczesny design, przemyślane rozwiązania i technologie, które ułatwiają codzienne funkcjonowanie firmy.",
      "Chcemy, aby nasi klienci nie tylko zaistnieli w internecie, ale również potrafili wykorzystać jego możliwości do budowania rozpoznawalności, pozyskiwania nowych odbiorców i dalszego rozwoju swojej działalności.",
    ],
    paper: "from-sky-100 to-sky-200/70",
    rotate: -1.2,
    tape: "right-10 -rotate-3",
  },
  {
    icon: FiFlag,
    title: "Twoja firma ma przyszłość. Pomóżmy jej zaistnieć w internecie.",
    description: [
      "Niezależnie od tego, czy dopiero zaczynasz, czy prowadzisz firmę od wielu lat, jesteśmy gotowi pomóc Ci zrobić kolejny krok. Stawiamy na partnerską współpracę, indywidualne podejście i rozwiązania dopasowane do Twoich potrzeb.",
    ],
    paper: "from-emerald-100 to-emerald-200/70",
    rotate: 2.2,
    tape: "left-1/2 -translate-x-1/2 rotate-1",
    link: { href: "#contact", label: "Porozmawiajmy" },
  },
];

const noteVariants: Variants = {
  hidden: (rotate: number) => ({
    opacity: 0,
    y: -40,
    scale: 1.08,
    rotate: rotate * 4,
  }),
  visible: (rotate: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  }),
};

const StickyNote = ({
  icon: Icon,
  title,
  description,
  paper,
  rotate,
  tape,
  link,
  index,
}: Note & { index: number }) => {
  return (
    <motion.li
      custom={rotate}
      variants={noteVariants}
      whileHover={{
        rotate: 0,
        y: -8,
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group relative isolate hover:z-10 md:even:mt-12"
    >
      <span
        aria-hidden="true"
        className="absolute right-4 bottom-2 -z-10 h-12 w-2/3 rotate-3 bg-black/20 blur-lg transition-all duration-300 group-hover:-bottom-1 group-hover:bg-black/25"
      />

      <div
        className={`relative flex h-full flex-col gap-4 bg-gradient-to-br ${paper} px-7 pt-10 pb-8 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_16px_-10px_rgba(0,0,0,0.3)]`}
      >
        <span
          aria-hidden="true"
          className={`absolute -top-3.5 h-7 w-24 bg-white/55 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[2px] ${tape}`}
        />
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 size-10 bg-gradient-to-tl from-black/[0.07] to-transparent"
        />

        <div className="flex items-center justify-between text-gray-500">
          <Icon aria-hidden="true" size={18} />
          <span className="font-hand text-xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-hand text-[1.75rem] leading-tight font-bold text-balance text-gray-900">
          {title}
        </h3>

        <div className="space-y-3 text-[15px] leading-relaxed font-light text-gray-700">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {link && (
          <a
            href={link.href}
            className="mt-auto inline-flex items-center gap-2 self-start pt-2 font-hand text-2xl font-bold text-gray-900 underline decoration-gray-900/30 underline-offset-4 transition-colors hover:decoration-gray-900"
          >
            {link.label}
            <FiArrowRight
              aria-hidden="true"
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        )}
      </div>
    </motion.li>
  );
};

export default () => {
  return (
    <section
      id="aboutUs"
      aria-labelledby="aboutUsTitle"
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white px-4 py-24 selection:bg-blue-100 selection:text-blue-900 sm:py-28 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#d4d4d8_1px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      />

      <div className="relative mx-auto w-full max-w-[120rem] px-3 lg:px-6">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
        >
          <h2
            id="aboutUsTitle"
            className="text-3xl font-bold text-balance text-black sm:text-4xl"
          >
            <ScrableText text="Nowoczesne rozwiązania. Realne możliwości. Wspólny rozwój." />
          </h2>
          <hr className="my-8 w-24 border-gray-200" />
          <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            W GrelSites wierzymy, że każda firma ma potencjał, aby rozwijać się
            i zdobywać nowych klientów. Naszą rolą jest pomóc jej w pełni go
            wykorzystać. Tworzymy nowoczesne strony internetowe, modernizujemy
            istniejące witryny i wdrażamy rozwiązania automatyzujące codzienną
            pracę. Wszystko po to, aby pomagać przedsiębiorcom budować silną
            pozycję w internecie i rozwijać swoje biznesy.
          </p>
        </motion.header>

        <motion.ul
          className="mt-16 grid items-start gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {NOTES.map((note, index) => (
            <StickyNote key={note.title} {...note} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
