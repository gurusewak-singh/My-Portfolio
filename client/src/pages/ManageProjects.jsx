import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; // Ensure this is correctly imported
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ManageProjects() {
  const [data, setData] = useState({ projects: [], totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async (page) => {
      setIsLoading(true);
      try {
        // A_ Fetch data for the specific page
        const res = await api.get(`/projects?page=${page}&limit=10`);
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await api.delete(`/projects/${id}`);
      // A_ Refetch the current page to reflect the deletion
      setCurrentPage(1); // Or refetch the current page if you prefer
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= data.totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        <div className="flex items-center space-x-4">
            <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
            >
                <ArrowLeft size={16} />
                <span>Back to Dashboard</span>
            </button>
            <button
            onClick={() => navigate('/admin/projects/new')}
            className="flex items-center space-x-2 bg-primary px-4 py-2 rounded-lg text-white font-semibold hover:bg-primary-dark transition-colors"
            >
                <Plus size={20} />
                <span>Add Project</span>
            </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading projects...</p>
      ) : (
        <div className="bg-dark-200 rounded-lg shadow-lg">
          <div className="space-y-2 p-4">
            {data.projects.map(project => (
              <div
                key={project._id}
                className="bg-dark-300/50 p-4 rounded-lg flex justify-between items-center hover:bg-dark-300 transition-colors"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                  <p className="text-sm text-gray-400 truncate max-w-md">{project.description}</p>
                </div>
                <div className="space-x-3 flex-shrink-0">
                  <button
                    onClick={() => navigate(`/admin/projects/${project._id}`)}
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="px-4 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4 border-t border-dark-300">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-dark-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>
            <span className="text-gray-400 text-sm">
              Page {currentPage} of {data.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.totalPages}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-dark-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}