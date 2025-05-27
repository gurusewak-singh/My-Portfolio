import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link if using React Router

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('https://my-portfolio-mpvy.onrender.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('adminToken', data.token);
      onLogin();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1E1E1E] text-white">
      <div className="bg-[#2a2a2a] p-8 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 rounded bg-[#1E1E1E]"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-[#1E1E1E]"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 p-2 rounded hover:bg-orange-600"
        >
          Login
        </button>

        {/* Back to portfolio */}
        <Link
          to="/"
          className="block text-center text-sm text-gray-400 hover:text-orange-500 transition"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
