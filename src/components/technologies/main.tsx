import ScrableText from "../../effects/scrableText";
import TypewriterText from "../../effects/TypewriterText";
import { motion } from "framer-motion";
import { SVG3D } from "3dsvg";
import {
  sectionVariants,
  gridVariants,
  AnimatedCard
} from "../../effects/motionAnimations.tsx";


import techIcons from "./techIcons.ts";

export default () => {
  return (
    <div id="technologies" className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">

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
            text="Od front-endu po back-end, korzystamy z najnowszych technologii, aby dostarczać innowacyjne rozwiązania."
            speed={35}
            deleteSpeed={30}
            className="mt-8 text-gray-600 text-lg"
          />
        </motion.div>

        <motion.div
          className="mt-30"
          variants={sectionVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3 className="text-2xl font-semibold text-black mb-6">Frontend</h3>
          <p className="text-md text-gray-700 mb-4 mx-auto w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            efficitur turpis. Vivamus leo ipsum, luctus eu pharetra et, congue
            id ex. Praesent sit amet ex sed velit tempus maximus. Maecenas
            egestas justo sed ante convallis cursus. Sed luctus elit eu mollis
            porttitor.
          </p>
          <motion.hr
            className="my-6 w-1/3 mx-auto border-gray-200"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >

            <SVG3D
              svg={techIcons.React}
              smoothness={0.6}
              color="#61DAFB"
              animate="float"
              resetOnIdle
              resetDelay={0.2}
            />

            <SVG3D
              svg={techIcons.TailWind}
              smoothness={0.6}
              color="#38BDF8"
              animate="float"
              resetOnIdle
              resetDelay={0.2}
            />

            <SVG3D
              svg={techIcons.TypeScript}
              smoothness={0.6}
              color="#3178C6"
              animate="float"
              resetOnIdle
              resetDelay={0.2}
            />

            <SVG3D
              svg={techIcons.JavaScript}
              smoothness={0.6}
              color="#F7DF1E"
              animate="float"
              resetOnIdle
              resetDelay={0.2}
            />

          </motion.div>
        </motion.div>

        <motion.div
          className="mt-30"
          variants={sectionVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3 className="text-2xl font-semibold text-black mb-6">Backend</h3>
          <p className="text-md text-gray-700 mb-4 mx-auto w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            efficitur turpis. Vivamus leo ipsum, luctus eu pharetra et, congue
            id ex. Praesent sit amet ex sed velit tempus maximus. Maecenas
            egestas justo sed ante convallis cursus. Sed luctus elit eu mollis
            porttitor.
          </p>
          <motion.hr
            className="my-6 w-1/3 mx-auto border-gray-200"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <AnimatedCard
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
              alt="Node.js"
              href="https://nodejs.org"
            />
            <AnimatedCard
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
              alt="Express"
              href="https://expressjs.com"
            />
            <AnimatedCard
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
              alt="MongoDB"
              href="https://www.mongodb.com"
            />
            <AnimatedCard
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"
              alt="Redis"
              href="https://redis.io"
            />
            <AnimatedCard
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
              alt="MySQL"
              href="https://www.mysql.com"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-30"
          variants={sectionVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3 className="text-2xl font-semibold text-black mb-6">CMS</h3>
          <p className="text-md text-gray-700 mb-4 mx-auto w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
            efficitur turpis. Vivamus leo ipsum, luctus eu pharetra et, congue
            id ex. Praesent sit amet ex sed velit tempus maximus. Maecenas
            egestas justo sed ante convallis cursus. Sed luctus elit eu mollis
            porttitor.
          </p>
          <motion.hr
            className="my-6 w-1/3 mx-auto border-gray-200"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <AnimatedCard
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg"
              alt="WordPress"
              href="https://wordpress.org"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
