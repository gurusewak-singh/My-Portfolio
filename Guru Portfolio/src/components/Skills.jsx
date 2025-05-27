import { motion } from 'framer-motion';
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb,
  SiTailwindcss, SiGit, SiTypescript, SiCplusplus
} from 'react-icons/si';
import { FaCode } from 'react-icons/fa'; // Used for Java, C, and DSA

const skillIcons = {
  JavaScript: <SiJavascript size={30} color="#f7df1e" />,
  React: <SiReact size={30} color="#61DBFB" />,
  "Node.js": <SiNodedotjs size={30} color="#3C873A" />,
  Express: <SiExpress size={30} color="#ffffff" />,
  MongoDB: <SiMongodb size={30} color="#47A248" />,
  Tailwind: <SiTailwindcss size={30} color="#38BDF8" />,
  Git: <SiGit size={30} color="#F05032" />,
  TypeScript: <SiTypescript size={30} color="#3178C6" />,
  Java: <FaCode size={30} color="#f89820" />, // Generic code icon for Java
  C: <FaCode size={30} color="#A8B9CC" />,
  "C++": <SiCplusplus size={30} color="#00599C" />,
  DSA: <FaCode size={30} color="#f97316" />
};

export default function Skills() {
  const skills = [
    "JavaScript", "React", "Node.js", "Express", "MongoDB",
    "Tailwind", "Git", "TypeScript", "Java", "C", "C++", "DSA"
  ];

  return (
    <section id="skills" className="bg-[#2a2a2a] py-16 px-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-10">
          <span className="text-orange-500">S</span>kills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              className="bg-[#1E1E1E] py-6 px-3 rounded-lg shadow text-center flex flex-col items-center justify-center border border-transparent hover:border-orange-500 hover:shadow-orange-500 transition duration-300"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {skillIcons[skill]}
              <span className="mt-3 font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}