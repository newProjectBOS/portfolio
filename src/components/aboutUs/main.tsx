import TypewriterText from "../../effects/TypewriterText";
import ScrableText from "../../effects/scrableText";
import team from "./teamMember";
import { motion } from "framer-motion";
import { gridVariants, cardVariants } from "../../effects/motionAnimations";
import UserCard from "./userCard";

export default () => {
  return (
    <div id="AboutUs" className="bg-gray-50 py-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <ScrableText
          text="Poznaj nasz zespół"
          className="text-4xl font-bold mb-4 text-black"
        />
        <hr className="my-6 border-gray-200" />
        <TypewriterText
          text="Poznaj nasz wyjątkowy zespół – synergię talentu, kreatywności i zaangażowania, który wspólnie z pasją i innowacyjnością przyczynia się do osiągnięcia sukcesu."
          speed={35}
          deleteSpeed={30}
          className="mt-8 text-gray-600 text-lg"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants as any}
              whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer"
            >
              <UserCard
                name={member.name}
                role={member.role}
                img={member.img}
                socials={member.socials}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};