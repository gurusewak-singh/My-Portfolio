import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddEditTestimonial() {
  const [testimonial, setTestimonial] = useState({ author: '', text: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:5000/api/testimonials/${id}`)
        .then(res => res.json())
        .then(data => setTestimonial(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `http://localhost:5000/api/testimonials/${id}` : `http://localhost:5000/api/testimonials`;
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(testimonial),
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      <button onClick={() => navigate('/admin/testimonials')} className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
  ← Back
</button>
      <h1 className="text-xl font-bold mb-4">{isEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input placeholder="Author" className="w-full p-2 bg-[#2a2a2a]" value={testimonial.author} onChange={e => setTestimonial({ ...testimonial, author: e.target.value })} />
        <textarea placeholder="Text" rows="4" className="w-full p-2 bg-[#2a2a2a]" value={testimonial.text} onChange={e => setTestimonial({ ...testimonial, text: e.target.value })} />
        <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">Save</button>
      </form>
    </div>
  );
}
