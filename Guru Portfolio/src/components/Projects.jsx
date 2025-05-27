import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <section id="projects" className="bg-[#1E1E1E] text-white py-16 px-10">
      <motion.h2
        className="text-3xl font-bold mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-orange-500">P</span>rojects
      </motion.h2>

      <div className="space-y-12">
        {projects.map((project, i) => (
          <motion.div
            key={project._id}
            className="flex flex-col md:flex-row items-center bg-[#2a2a2a] p-6 rounded-xl shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* Left: Project Text */}
            <div className="md:w-2/3 w-full md:pr-6">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-1">
                {project.techStack.join(', ')}
              </p>
              <p className="text-gray-300 text-sm mb-4">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                View Project →
              </a>
            </div>

            {/* Right: Project Image */}
            <div className="md:w-1/3 w-full mt-6 md:mt-0 flex justify-end">
              <img
                src={`http://localhost:5000/uploads/${project.image}`}
                alt={project.title}
                className="rounded-lg w-full md:w-[300px] object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
