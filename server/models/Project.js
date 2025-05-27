import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  image: String,
  link: String
});

export default mongoose.model('Project', projectSchema);
