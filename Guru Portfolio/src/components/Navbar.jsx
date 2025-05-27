import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    // { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1E1E1E] shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold text-orange-500 tracking-widest"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          GURU
        </motion.div>

        {/* Navigation */}
        <ul className="hidden md:flex space-x-6 text-sm uppercase tracking-wide">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.name}
              whileHover={{ scale: 1.1, color: "#FFA500" }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <a href={link.href} className="hover:text-orange-500 transition">
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
