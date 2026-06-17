import { motion } from "framer-motion";
import ImageComponent from "../components/technologies/imageComponent.tsx";
const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AnimatedCard = ({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) => (
  <motion.div
    variants={cardVariants as any}
    whileHover={{
      scale: 1.08,
      y: -6,
      transition: { duration: 0.25, ease: "easeOut" },
    }}
    whileTap={{ scale: 0.96 }}
    className="cursor-pointer"
  >
    <ImageComponent src={src} alt={alt} href={href} />
  </motion.div>
);

export { sectionVariants, gridVariants, cardVariants, AnimatedCard };
