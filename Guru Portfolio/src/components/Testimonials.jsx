import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('https://my-portfolio-mpvy.onrender.com/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);

  return (
    <section id="testimonials" className="bg-[#1E1E1E] text-white py-16 px-10">
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-orange-500">T</span>estimonials
      </motion.h2>
      <div className="space-y-6">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t._id}
            className="italic text-lg max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            “{t.text}”
            <footer className="text-sm mt-2 text-gray-400">— {t.author}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
