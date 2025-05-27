import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setStatus(data.message);
      if (res.ok) {
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <section id="contact" className="bg-[#2a2a2a] text-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-[#1E1E1E] rounded-lg p-8 md:p-12 shadow-lg flex flex-col md:flex-row gap-12"
      >
        {/* Left: Let's Connect Section */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-orange-500">L</span>et’s Connect
          </h2>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            I’d love to hear from you — whether you have a question, want to collaborate, or just want to say hi.
            Feel free to drop a message or connect with me on socials!
          </p>
          <div className="flex gap-5 text-3xl mt-4">
            <a href="https://www.linkedin.com/in/gurusewak122" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/gurusewak-singh" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaGithub />
            </a>
            <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/gurusewakk_" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="md:w-1/2 space-y-4">
          <h3 className="text-2xl font-semibold mb-4">
            <span className="text-orange-500">S</span>end a Message
          </h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 rounded bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-500 px-6 py-2 rounded text-white hover:bg-orange-600 transition"
          >
            Send
          </button>
          {status && <p className="text-sm mt-2 text-orange-400">{status}</p>}
        </form>
      </motion.div>
    </section>
  );
}
