import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    // A_ Get page and limit from query params, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    // A_ Get the paginated results
    const projects = await Project.find()
      .sort({ createdAt: -1 }) // Optional: sort by newest first
      .skip(skip)
      .limit(limit);

    // A_ Get the total number of documents for pagination info
    const totalProjects = await Project.countDocuments();

    // A_ Send back the projects and pagination info
    res.json({
      projects,
      currentPage: page,
      totalPages: Math.ceil(totalProjects / limit),
      totalProjects,
    });
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
    // A_ Add githubLink to the destructuring
    const { title, description, techStack, link, githubLink } = req.body;
    const image = req.file ? req.file.path : ''; 

    const techArray = typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()) : [];

    const newProject = new Project({
      title,
      description,
      techStack: techArray,
      link,
      githubLink, // A_ Save the new field
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
    // A_ Add githubLink to the destructuring
    const { title, description, techStack, link, githubLink } = req.body;
    const image = req.file ? req.file.path : undefined;

    const techArray = typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()) : [];
    
    const updateData = {
      title,
      description,
      techStack: techArray,
      link,
      githubLink, // A_ Add the new field to the update object
    };
    
    if (image) {
      updateData.image = image;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
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