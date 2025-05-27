import express from 'express';
import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

router.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
});

export default router;
