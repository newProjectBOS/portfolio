import ScrableText from "../../effects/scrableText";
import TypewriterText from "../../effects/TypewriterText";
import { motion } from "framer-motion";
import { SVG3D } from "3dsvg";
import {
  sectionVariants,
  gridVariants,
  AnimatedCard,
} from "../../effects/motionAnimations.tsx";

const React = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg';

const TailWind = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg`;

const TypeScript = `<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1280.000000pt" height="1280.000000pt" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M405 12789 c-87 -13 -195 -68 -261 -133 -65 -66 -119 -172 -134 -266 -14 -91 -14 -11889 0 -11980 33 -207 198 -370 405 -400 97 -13 11873 -13 11970 0 210 30 375 195 405 405 13 97 13 11873 0 11970 -30 210 -195 375 -405 405 -88 12 -11893 11 -11980 -1z m6715 -6274 l0 -525 -820 0 -820 0 0 -2340 0 -2340 -650 0 -650 0 0 2340 0 2340 -810 0 -810 0 0 525 0 525 2280 0 2280 0 0 -525z m3348 501 c278 -32 539 -87 742 -158 l95 -33 3 -597 c1 -329 0 -598 -4 -598 -3 0 -38 20 -78 44 -361 219 -834 346 -1286 346 -471 -1 -800 -139 -922 -388 -32 -64 -33 -71 -33 -187 0 -121 0 -121 39 -201 102 -207 361 -378 966 -637 313 -134 445 -197 603 -286 402 -224 659 -468 807 -761 124 -247 168 -472 157 -805 -12 -390 -93 -636 -298 -910 -257 -344 -690 -575 -1259 -669 -265 -44 -356 -50 -740 -50 -296 -1 -407 3 -525 17 -412 49 -703 119 -986 239 l-119 50 0 645 0 645 24 -19 c197 -153 304 -221 491 -313 357 -176 742 -259 1145 -247 365 11 599 86 755 242 82 81 119 151 137 254 46 271 -135 511 -556 735 -116 62 -311 150 -576 261 -486 202 -769 374 -1004 610 -238 240 -375 512 -427 850 -20 128 -14 418 10 559 134 763 789 1259 1806 1365 55 6 116 13 135 15 94 11 763 -3 898 -18z"/> </g> </svg> `;

const JS = `<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="960.000000pt" height="960.000000pt" viewBox="0 0 960.000000 960.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,960.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M805 9590 c-3 -5 -20 -10 -37 -10 -18 0 -48 -5 -67 -11 -87 -27 -178 -64 -203 -81 -14 -10 -29 -18 -33 -18 -14 0 -131 -89 -179 -136 -101 -100 -174 -209 -218 -329 -39 -107 -48 -139 -48 -173 0 -17 -4 -34 -10 -37 -14 -9 -14 -7991 0 -8000 6 -3 10 -20 10 -37 0 -34 9 -66 48 -173 44 -120 117 -229 218 -329 48 -47 165 -136 179 -136 4 0 19 -8 33 -18 27 -19 127 -58 212 -84 67 -20 8123 -20 8190 0 194 59 319 131 444 258 47 48 136 165 136 179 0 4 8 19 18 33 19 27 58 127 84 212 20 67 20 8123 0 8190 -26 85 -65 185 -84 212 -10 14 -18 29 -18 33 0 14 -89 131 -136 179 -100 101 -209 174 -329 218 -107 39 -139 48 -173 48 -17 0 -34 5 -37 10 -4 7 -1348 10 -4000 10 -2652 0 -3996 -3 -4000 -10z m6765 -4384 c417 -56 708 -238 938 -589 55 -83 62 -101 51 -112 -24 -23 -662 -435 -674 -435 -6 0 -33 34 -60 76 -95 145 -222 240 -365 275 -30 7 -102 13 -160 12 -121 -1 -192 -21 -277 -79 -177 -122 -205 -400 -57 -580 70 -86 273 -200 559 -314 553 -221 930 -469 1112 -732 136 -196 197 -390 210 -658 26 -567 -261 -1004 -792 -1203 -403 -151 -956 -154 -1396 -7 -271 90 -531 259 -707 459 -103 116 -227 305 -220 336 3 13 689 435 709 435 4 0 31 -33 58 -73 160 -237 352 -381 586 -439 127 -31 364 -31 478 0 233 64 365 204 375 398 8 153 -46 266 -176 370 -73 58 -361 200 -613 303 -598 242 -891 469 -1054 814 -86 182 -121 373 -112 620 8 235 61 409 180 590 184 282 503 475 877 531 124 18 397 19 530 2z m-2352 -1688 c-3 -1568 -4 -1668 -22 -1758 -107 -556 -443 -888 -996 -984 -132 -24 -362 -31 -495 -17 -218 24 -373 69 -546 158 -203 104 -385 268 -512 460 -65 98 -115 190 -106 196 45 35 674 437 683 437 7 0 43 -46 81 -102 88 -132 220 -265 297 -301 112 -53 226 -68 356 -47 153 25 248 91 307 214 67 141 65 73 65 1827 l0 1579 445 0 445 0 -2 -1662z"/> </g> </svg> `;

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
              svg={React}
              smoothness={0.6}
              color="#61DAFB"
              animate="float"
              resetOnIdle
              resetDelay={0.2}
            />

            <SVG3D
              svg={TailWind}
              smoothness={0.6}
              color="#38BDF8"
              animate="float"
              resetOnIdle
              resetDelay={0.2}
            />

            <SVG3D
              svg={TypeScript}
              smoothness={0.6}
              color="#3178C6"
              animate="float"
              resetOnIdle
              resetDelay={0.2}
            />

            <SVG3D
              svg={JS}
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
