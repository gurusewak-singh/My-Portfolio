import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LayoutDashboard, Layers, MessageSquareText, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const navLinkClasses = "flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-dark-300 hover:text-white transition-colors";
  const activeNavLinkClasses = "bg-primary/20 text-primary font-semibold";

  return (
    <div className="min-h-screen flex bg-dark-100 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-200 p-4 flex flex-col shadow-lg">
        <h1 className="text-2xl font-bold text-primary tracking-widest mb-10 text-center font-mono">ADMIN</h1>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <NavLink to="/admin/dashboard" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/projects" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <Layers size={20} />
                <span>Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/testimonials" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                <MessageSquareText size={20} />
                <span>Testimonials</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <button onClick={logout} className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}