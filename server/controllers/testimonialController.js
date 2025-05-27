import Testimonial from '../models/Testimonial.js';

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { text, author } = req.body;
    const newTestimonial = new Testimonial({ text, author });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { text, author } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    testimonial.text = text;
    testimonial.author = author;

    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Testimonial not found' });

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
