import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';

const router = express.Router();

// GET all testimonials
router.get('/', getTestimonials);

// GET a single testimonial
router.get('/:id', getTestimonialById);

// CREATE a new testimonial
router.post('/', verifyToken, createTestimonial);
router.put('/:id', verifyToken, updateTestimonial);
router.delete('/:id', verifyToken, deleteTestimonial);
export default router;
