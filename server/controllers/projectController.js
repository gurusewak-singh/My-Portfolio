import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, link } = req.body;
    const image = req.file?.filename; // Ensure file was uploaded

    // Defensive check: ensure techStack is a string before splitting
    const techArray = typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()) : [];

    const newProject = new Project({
      title,
      description,
      techStack: techArray,
      link,
      image,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error in createProject:', err);
    res.status(400).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, link } = req.body;
    const image = req.file?.filename;

    const techArray = typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()) : [];

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        techStack: techArray,
        link,
        ...(image && { image }), // only update image if a new one is provided
      },
      { new: true }
    );

    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err) {
    console.error('Error in updateProject:', err);
    res.status(400).json({ message: err.message });
  }
};



export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
