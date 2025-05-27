// src/pages/ManageTestimonials.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);

  const handleDelete = async (id) => {
  const token = localStorage.getItem('adminToken');
  if (window.confirm("Are you sure you want to delete this testimonial?")) {
    await fetch(`http://localhost:5000/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setTestimonials(testimonials.filter(t => t._id !== id));
  }
};

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <button
    onClick={() => navigate('/admin/dashboard')}
    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
  >
    ← Back
  </button>
        <h1 className="text-2xl font-bold text-orange-500">Manage Testimonials</h1>
        <button
          onClick={() => navigate('/admin/testimonials/new')}
          className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Add Testimonial
        </button>
      </div>
      <div className="space-y-4">
        {testimonials.map(testimonial => (
          <div
            key={testimonial._id}
            className="bg-[#2a2a2a] p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="italic">"{testimonial.text}"</p>
              <p className="text-sm text-gray-400 mt-1">– {testimonial.author}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/admin/testimonials/${testimonial._id}`)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
