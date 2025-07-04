import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Layers, MessageSquareText } from 'lucide-react';
import api from '../utils/api';

const StatCard = ({ title, value, icon, isLoading }) => (
    <div className="bg-dark-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div className="bg-dark-300 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-sm">{title}</p>
            {isLoading ? (
              <div className="w-12 h-8 bg-dark-300 rounded animate-pulse mt-1"></div>
            ) : (
              <p className="text-2xl font-bold text-white">{value}</p>
            )}
        </div>
    </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ projects: 0, testimonials: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [projectsRes, testimonialsRes] = await Promise.all([
          api.get('/projects'),
          api.get('/testimonials')
        ]);
        setCounts({
          projects: projectsRes.data.length,
          testimonials: testimonialsRes.data.length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Projects" 
            value={counts.projects} 
            icon={<Layers className="text-primary" size={24} />} 
            isLoading={isLoading}
          />
          <StatCard 
            title="Testimonials" 
            value={counts.testimonials} 
            icon={<MessageSquareText className="text-primary" size={24} />} 
            isLoading={isLoading}
          />
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4">Manage Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/admin/projects")}
          className="w-full text-left bg-dark-200 hover:bg-dark-300 px-6 py-4 rounded-lg transition-colors flex items-center space-x-4"
        >
            <Layers className="text-primary" />
            <span className="font-semibold text-lg">Manage Projects</span>
        </button>
        <button
          onClick={() => navigate("/admin/testimonials")}
          className="w-full text-left bg-dark-200 hover:bg-dark-300 px-6 py-4 rounded-lg transition-colors flex items-center space-x-4"
        >
            <MessageSquareText className="text-primary" />
            <span className="font-semibold text-lg">Manage Testimonials</span>
        </button>
      </div>
    </div>
  );
}