import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
// A_Import the new api client
import api from '../utils/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ message: 'Sending...', type: 'info' });
    try {
      // A_Using the new api client
      const res = await api.post('/contact', formData);
      setStatus({ message: res.data.message, type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
    }
  };

  return (
    <section id="contact" className="bg-dark-200 text-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-dark-100 rounded-lg p-8 md:p-12 shadow-lg flex flex-col md:flex-row gap-12"
      >
        {/* Left: Let's Connect Section */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-primary">L</span>et’s Connect
          </h2>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            Have a project in mind, a question, or just want to say hi? I’d love to hear from you.
            Drop me a line or find me on social media.
          </p>
          <div className="flex gap-5 text-3xl mt-4">
            <a href="https://www.linkedin.com/in/gurusewak122" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com/gurusewak-singh" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <FaGithub />
            </a>
            <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/gurusewakk_" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="md:w-1/2 space-y-4">
          <h3 className="text-2xl font-semibold mb-4">
            <span className="text-primary">S</span>end a Message
          </h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded bg-dark-200 text-white outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded bg-dark-200 text-white outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 rounded bg-dark-200 text-white outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button
            type="submit"
            className="bg-primary px-6 py-2 rounded text-white font-semibold hover:bg-primary-dark transition"
          >
            Send
          </button>
          {status.message && (
             <p className={`text-sm mt-2 ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {status.message}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}