import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import SkeletonCard from './SkeletonCard';
import { getTechIcon } from './Skills'; // A_ Import the icon getter
import { FaGithub } from 'react-icons/fa'; // A_ Import GitHub icon

// A_ Reusable animation variants for text
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.get('/projects?limit=100')
      .then(res => {
        setProjects(res.data.projects);
      })
      .catch(err => {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      })
      .finally(() => setIsLoading(false));
  }, []);
  
  const optimizeCloudinaryImage = (url) => {
    if (!url || !url.includes('cloudinary')) return url;
    return url.replace('/upload/', '/upload/w_800,q_auto,f_auto/');
  };

  return (
    <section id="projects" className="bg-dark-100 text-white py-20 px-6 md:px-10">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary">M</span>y Projects
      </motion.h2>

      <div className="space-y-16 max-w-6xl mx-auto">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard reverse={true} />
          </>
        ) : (
          projects.map((project, i) => (
            <React.Fragment key={project._id}>
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.2 }}
              >
                {/* Text Content */}
                <div className={`md:w-1/2 w-full ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <motion.h3 variants={textVariants} custom={0} className="text-3xl font-bold mb-4 text-gray-100">{project.title}</motion.h3>

                  <motion.div variants={textVariants} custom={1} className="flex flex-wrap items-center gap-3 mb-5">
                    {project.techStack.map(tech => (
                      <div key={tech} className="flex items-center gap-2 bg-dark-200/50 px-3 py-1 rounded-full text-sm">
                        {React.cloneElement(getTechIcon(tech), { size: 16 })}
                        <span>{tech}</span>
                      </div>
                    ))}
                  </motion.div>
                  
                  <motion.p variants={textVariants} custom={2} className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {project.description}
                  </motion.p>
                  
                  <motion.div variants={textVariants} custom={3} className="flex items-center gap-x-8 gap-y-4 flex-wrap mt-8">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:underline text-lg"
                    >
                      View Project →
                    </a>
                    
                    {/* A_ Updated GitHub link display */}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                        title="View Source Code"
                      >
                        <FaGithub className="text-2xl" />
                        <span className="text-lg font-semibold group-hover:underline">Github Repo</span>
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Image Content */}
                <motion.div variants={textVariants} custom={1} className={`md:w-1/2 w-full ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <div className="bg-dark-200 p-4 rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2">
                    <img
                      src={optimizeCloudinaryImage(project.image)}
                      alt={project.title}
                      className="rounded-lg w-full object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {i < projects.length - 1 && (
                <div className="w-1/2 mx-auto my-8 border-b border-dark-200"></div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </section>
  );
}