import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="bg-[#2a2a2a] text-white py-20 px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-orange-500">A</span>bout <span className="text-orange-500">M</span>e
        </h2>
        <p className="text-gray-300 max-w-3xl">
          I’m a developer with 3+ years of experience building scalable web apps using the MERN stack. I'm passionate about crafting beautiful UIs and delivering seamless user experiences.
        </p>
      </motion.div>
    </section>
  );
}
