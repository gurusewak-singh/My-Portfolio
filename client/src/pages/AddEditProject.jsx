import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api'; // A_ Use our axios instance
import { ArrowLeft } from 'lucide-react';

export default function AddEditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [project, setProject] = useState({
    title: '',
    description: '',
    techStack: '',
    link: '',
    githubLink: '', // A_ Add to initial state
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      api.get(`/projects/${id}`)
        .then(res => {
          const { techStack, githubLink, ...rest } = res.data;
          setProject({
            ...rest,
            techStack: Array.isArray(techStack) ? techStack.join(', ') : '',
            githubLink: githubLink || '', // A_ Set githubLink if present
          });
          if (res.data.image) {
            // A_ The image path from the db is a full URL, no need to prepend anything
            setImagePreview(res.data.image);
          }
        })
        .catch(err => setError('Failed to load project data.'))
        .finally(() => setIsLoading(false));
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('techStack', project.techStack);
    formData.append('link', project.link);
    formData.append('githubLink', project.githubLink); // A_ Add to form data
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEdit) {
        // A_ Use api.put for editing. The headers are handled automatically.
        await api.put(`/projects/${id}`, formData);
      } else {
        // A_ Use api.post for creating.
        await api.post('/projects', formData);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEdit) return <p>Loading project details...</p>

  return (
    <div className="animate-fade-in-up">
      <button
        onClick={() => navigate('/admin/projects')}
        className="mb-6 flex items-center space-x-2 text-gray-300 hover:text-white"
      >
        <ArrowLeft size={18} />
        <span>Back to Projects</span>
      </button>

      <h1 className="text-3xl font-bold mb-6 text-white">
        {isEdit ? 'Edit Project' : 'Add New Project'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <input
          placeholder="Title"
          className="w-full p-3 bg-dark-200 rounded text-white outline-none focus:ring-2 focus:ring-primary"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-3 bg-dark-200 rounded text-white outline-none focus:ring-2 focus:ring-primary"
          rows="5"
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          required
        />
        <input
          placeholder="Tech Stack (comma separated, e.g., React, Node.js, MongoDB)"
          className="w-full p-3 bg-dark-200 rounded text-white outline-none focus:ring-2 focus:ring-primary"
          value={project.techStack}
          onChange={(e) => setProject({ ...project, techStack: e.target.value })}
          required
        />
        <input
          placeholder="Project Link (e.g., GitHub or live site)"
          className="w-full p-3 bg-dark-200 rounded text-white outline-none focus:ring-2 focus:ring-primary"
          value={project.link}
          onChange={(e) => setProject({ ...project, link: e.target.value })}
          required
        />
        {/* A_ Add the new input field for the GitHub link */}
        <input
          placeholder="GitHub Repository Link"
          className="w-full p-3 bg-dark-200 rounded text-white outline-none focus:ring-2 focus:ring-primary"
          value={project.githubLink || ''}
          onChange={(e) => setProject({ ...project, githubLink: e.target.value })}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Image</label>
          <input 
            type="file" 
            accept="image/*" 
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark" 
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Project Preview" className="w-48 h-auto rounded-lg bg-dark-300" />
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary px-6 py-3 rounded text-white font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Project'}
        </button>
      </form>
    </div>
  );
}