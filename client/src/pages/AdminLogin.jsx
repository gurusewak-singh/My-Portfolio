import { useState } from 'react';
// A_ Import Link for the back button and useNavigate for redirection
import { Link, useNavigate } from 'react-router-dom';
// A_ Import the api utility
import api from '../utils/api';

// A_ The component no longer needs the onLogin prop
export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // A_ Initialize the navigate function
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // A_ Use the new api utility for the request
      const res = await api.post('/admin/login', { username, password });
      
      // A_ The API utility automatically handles non-2xx responses as errors,
      // so we just need to handle the success case here.
      localStorage.setItem('adminToken', res.data.token);
      
      // A_ Directly navigate to the dashboard on success
      navigate('/admin/dashboard');

    } catch (err) {
      // A_ Set a user-friendly error message
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-100 text-white">
      <div className="bg-dark-200 p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-primary">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded bg-dark-100 text-white outline-none focus:ring-2 focus:ring-primary"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-dark-100 text-white outline-none focus:ring-2 focus:ring-primary"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-primary p-3 rounded text-white font-semibold hover:bg-primary-dark transition-colors"
        >
          Login
        </button>

        {/* Back to portfolio */}
        <Link
          to="/"
          className="block text-center text-sm text-gray-400 hover:text-primary transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}