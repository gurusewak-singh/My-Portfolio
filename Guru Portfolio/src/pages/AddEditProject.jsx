import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const token = localStorage.getItem('adminToken');

export default function AddEditProject() {
  const [project, setProject] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
    image: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    if (isEdit) {
      fetch(`https://my-portfolio-mpvy.onrender.com/api/projects/${id}`)
        .then(res => res.json())
        .then(data => {
          setProject({
            ...data,
            techStack: Array.isArray(data.techStack) ? data.techStack.join(', ') : data.techStack,
          });
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', project.title);
  formData.append('description', project.description);
  formData.append('techStack', project.techStack);
  formData.append('link', project.link);
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const method = isEdit ? 'PUT' : 'POST';
  const url = isEdit ? `https://my-portfolio-mpvy.onrender.com/api/projects/${id}` : `https://my-portfolio-mpvy.onrender.com/api/projects`;

  await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData
  });

  navigate('/admin/projects');
};
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white px-6 py-8">
      <button
        onClick={() => navigate('/admin/projects')}
        className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? 'Edit Project' : 'Add Project'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          placeholder="Title"
          className="w-full p-2 bg-[#2a2a2a] rounded"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 bg-[#2a2a2a] rounded"
          rows="4"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
        <input
          placeholder="Tech Stack (comma separated)"
          className="w-full p-2 bg-[#2a2a2a] rounded"
          value={project.techStack}
          onChange={(e) =>
            setProject({ ...project, techStack: e.target.value })
          }
        />
        <input type="file" 
        accept="image/*" 
        className="w-full p-2 bg-[#2a2a2a]" 
        onChange={(e) => setImageFile(e.target.files[0])}
         />
        <input
          placeholder="Link"
          className="w-full p-2 bg-[#2a2a2a] rounded"
          value={project.link}
          onChange={(e) => setProject({ ...project, link: e.target.value })}
        />
        <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition">
          Save
        </button>
      </form>
    </div>
  );
}
