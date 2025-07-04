import dotenv from 'dotenv';
dotenv.config(); // Load .env variables before anything else

import path from 'path';
import { fileURLToPath } from 'url';

// --- START: BULLETPROOF .ENV LOADING ---
// This code finds the exact location of your .env file and loads it.
// This is the most reliable method and removes all guesswork.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- END: BULLETPROOF .ENV LOADING ---

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// A_ Import the DEDICATED route files
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminAuthRoutes from './routes/adminAuth.js';
import apiRoutes from './routes/api.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://my-portfolio-frontend.vercel.app',
  ,'https://gurusewak-portfolio.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// A_ REGISTER THE DEDICATED ROUTES
app.use('/api', apiRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminAuthRoutes);

export default app;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}