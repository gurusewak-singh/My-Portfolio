import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

await Project.deleteMany();
await Testimonial.deleteMany();

await Project.insertMany([
  {
    title: 'E-commerce Website',
    description: 'An online shopping platform built with MERN stack.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    image: 'https://via.placeholder.com/400x200?text=E-commerce',
    link: 'https://github.com/yourusername/ecommerce-app'
  },
  {
    title: 'Chat App',
    description: 'Real-time chat application using Socket.io.',
    techStack: ['React', 'Node.js', 'Socket.io'],
    image: 'https://via.placeholder.com/400x200?text=Chat+App',
    link: 'https://github.com/yourusername/chat-app'
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio showcasing projects and skills.',
    techStack: ['React', 'Tailwind CSS'],
    image: 'https://via.placeholder.com/400x200?text=Portfolio',
    link: 'https://yourportfolio.com'
  }
]);

await Testimonial.insertMany([
  {
    text: 'Guru is an exceptional developer who delivers top-quality work.',
    author: 'John Smith, CEO of TechCo'
  },
  {
    text: 'Reliable, efficient, and always on time. Highly recommended!',
    author: 'Jane Doe, Product Manager'
  }
]);

console.log('✅ Data seeded successfully!');
process.exit();
