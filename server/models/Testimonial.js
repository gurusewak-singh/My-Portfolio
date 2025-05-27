import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  text: String,
  author: String
});

export default mongoose.model('Testimonial', testimonialSchema);
