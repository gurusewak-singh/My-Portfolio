import { motion } from 'framer-motion';
// A_ We will use this file for both Skills and Project tech stacks
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb,
  SiTailwindcss, SiGit, SiTypescript, SiCplusplus, SiVite, SiAxios, SiJsonwebtokens, SiMongoose
} from 'react-icons/si';
import { FaJava, FaCode, FaArchive } from 'react-icons/fa';

// A_ Create a reusable map of tech names to icons
export const techIcons = {
  javascript: <SiJavascript size={30} color="#f7df1e" />,
  react: <SiReact size={30} color="#61DBFB" />,
  'node.js': <SiNodedotjs size={30} color="#3C873A" />,
  express: <SiExpress size={30} color="#ffffff" />,
  mongodb: <SiMongodb size={30} color="#47A248" />,
  tailwind: <SiTailwindcss size={30} color="#38BDF8" />,
  git: <SiGit size={30} color="#F05032" />,
  typescript: <SiTypescript size={30} color="#3178C6" />,
  java: <FaJava size={30} color="#f89820" />,
  c: <FaCode size={30} color="#A8B9CC" />,
  'c++': <SiCplusplus size={30} color="#00599C" />,
  dsa: <FaCode size={30} color="#f97316" />,
  vite: <SiVite size={30} color="#646CFF" />,
  axios: <SiAxios size={30} color="#5A29E4" />,
  jwt: <SiJsonwebtokens size={30} color="#FB015B" />,
  mongoose: <SiMongoose size={30} color="#880000" />,
  unzipper: <FaArchive size={30} color="#E89232" />,
  default: <FaCode size={30} color="#888" />,
};

export const getTechIcon = (name) => {
    return techIcons[name.toLowerCase().trim()] || techIcons['default'];
};

export default function Skills() {
  const skills = [
    "JavaScript", "React", "Node.js", "Express", "MongoDB",
    "Tailwind", "Git", "TypeScript", "Java", "C", "C++", "DSA"
  ];

  return (
    <section id="skills" className="bg-dark-200 py-20 px-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="text-primary">T</span>ools & <span className="text-primary">S</span>kills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              // A_ REMOVED the Framer Motion hover animation props.
              // A_ ADDED group class for hover effect on children
              className="group relative bg-dark-100 p-6 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer shadow-lg overflow-hidden"
              // A_ Add a subtle animation for when the cards appear
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* A_ The Shimmer Effect Overlay */}
              {/* It's hidden by default and becomes visible and animates on group-hover */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                           bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500"
              />

              {/* A_ The Card Content */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                {getTechIcon(skill)}
                <span className="font-medium text-white text-lg">{skill}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}