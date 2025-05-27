import { motion } from 'framer-motion';
import { Lightbulb, Code, Users, Zap } from 'lucide-react';

const qualities = [
  {
    icon: <Lightbulb className="w-8 h-8 text-orange-500" />,
    title: 'Creative Thinker',
    desc: 'I approach problems with innovative solutions and a design-first mindset.',
  },
  {
    icon: <Code className="w-8 h-8 text-orange-500" />,
    title: 'Full-Stack Developer',
    desc: 'Experienced in both frontend finesse and backend logic using the MERN stack.',
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: 'Team Player',
    desc: 'I thrive in collaborative environments and communicate effectively.',
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: 'Quick Learner',
    desc: 'Always eager to learn new tools and adapt quickly to challenges.',
  },
];

function QualityCard({ icon, title, desc }) {
  return (
    <div className="relative overflow-hidden bg-[#1e1e1e] p-5 rounded-2xl group hover:cursor-pointer">
      {/* Shine overlay — hidden until hover */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
  className="
    absolute w-[120%] h-[40%]
    bg-orange-400/30
    rotate-[45deg]
    opacity-0
    group-hover:animate-[diagonal-shine_0.7s_ease-in-out_forwards]
  "
/>

      </div>

      {/* Card content */}
      <div className="relative z-20">
        <div className="mb-3">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
    </div>
  );
}




export default function About() {
  return (
    <section id="about" className="bg-[#2a2a2a] text-white py-20 px-10">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left - Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-orange-500">A</span>bout <span className="text-orange-500">M</span>e
          </h2>
          <p className="text-gray-300 max-w-xl leading-relaxed">
            Passionate. Precise. Persistent. <br />
            I’m a problem-solver who transforms ideas into responsive digital experiences.<br />
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
