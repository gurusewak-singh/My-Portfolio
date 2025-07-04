import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
    fetch('http://localhost:5000/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);

  const handleDelete = async (type, id) => {
    await fetch(`http://localhost:5000/api/${type}/${id}`, { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <Link to="/admin/projects/new" className="text-orange-500">+ Add Project</Link>
        <ul className="mt-2 space-y-2">
          {projects.map(project => (
            <li key={project._id} className="bg-[#2a2a2a] p-3 rounded flex justify-between items-center">
              <span>{project.title}</span>
              <div className="space-x-4">
                <Link to={`/admin/projects/${project._id}`} className="text-blue-400">Edit</Link>
                <button onClick={() => handleDelete('projects', project._id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
        <Link to="/admin/testimonials/new" className="text-orange-500">+ Add Testimonial</Link>
        <ul className="mt-2 space-y-2">
          {testimonials.map(t => (
            <li key={t._id} className="bg-[#2a2a2a] p-3 rounded flex justify-between items-center">
              <span>{t.author}</span>
              <div className="space-x-4">
                <Link to={`/admin/testimonials/${t._id}`} className="text-blue-400">Edit</Link>
                <button onClick={() => handleDelete('testimonials', t._id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
