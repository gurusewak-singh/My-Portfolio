import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');

  // If the user is not authenticated, redirect them specifically to the login page.
  return token ? children : <Navigate to="/admin/login" />;
}