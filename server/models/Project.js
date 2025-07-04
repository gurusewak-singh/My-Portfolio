import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  image: String,
  link: String,
  githubLink: String, // A_ Add this new field
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);