// src/pages/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white px-8 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Admin Dashboard</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Logout</button>
      </div>

      <div className="space-y-6">
        <button
          onClick={() => navigate("/admin/projects")}
          className="block w-full text-left bg-[#2a2a2a] hover:bg-[#333] px-4 py-3 rounded"
        >
          Manage Projects
        </button>
        <button
          onClick={() => navigate("/admin/testimonials")}
          className="block w-full text-left bg-[#2a2a2a] hover:bg-[#333] px-4 py-3 rounded"
        >
          Manage Testimonials
        </button>
      </div>
    </div>
  );
}
