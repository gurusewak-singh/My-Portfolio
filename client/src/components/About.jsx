import { motion } from 'framer-motion';
import { Lightbulb, Code, Users, Zap } from 'lucide-react';
import RotatingText from './RotatingText'; // A_ Import the new component

const qualities = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: 'Creative Thinker',
    desc: 'I approach problems with innovative solutions and a design-first mindset.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Full-Stack Developer',
    desc: 'Experienced in both frontend finesse and backend logic using the MERN stack.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Team Player',
    desc: 'I thrive in collaborative environments and communicate effectively.',
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Quick Learner',
    desc: 'Always eager to learn new tools and adapt quickly to challenges.',
  },
];

function QualityCard({ icon, title, desc }) {
  return (
    <motion.div 
      className="relative overflow-hidden bg-dark-100 p-5 rounded-2xl group hover:cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Shine overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-[-200%] w-[400%] h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine" />
      </div>

      {/* Card content */}
      <div className="relative z-20">
        <div className="mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-dark-200 text-white py-20 px-10">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left - Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-primary">A</span>bout <span className="text-primary">M</span>e
          </h2>
          
          {/* A_ The new rotating text effect */}
          <div className="text-2xl md:text-3xl font-semibold text-white mb-6 flex items-center gap-3">
            Creative
            <RotatingText
              texts={["Web Apps", "Coding", "Thinking"]}
              mainClassName="px-3 py-1 bg-primary text-white overflow-hidden justify-center rounded-lg"
              staggerFrom={"first"}
              splitBy={"characters"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              rotationInterval={1800}
            />
          </div>

          <p className="text-gray-300 max-w-xl leading-relaxed">
            I transform ideas into responsive digital experiences.
            With over 3 years of MERN stack development, I blend code with creativity to craft seamless, scalable solutions.
          </p>
        </motion.div>

        {/* Right - Qualities */}
        <div className="grid sm:grid-cols-2 gap-6">
          {qualities.map((q, i) => (
            <QualityCard key={i} {...q} />
          ))}
        </div>
      </div>
    </section>
  );
}