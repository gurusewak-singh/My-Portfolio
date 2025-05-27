import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProjects); // GET all
router.get('/:id', getProjectById); // GET by ID
// router.post('/', verifyToken, createProject);
// router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);
router.post('/', upload.single('image'), verifyToken, createProject);
router.put('/:id', upload.single('image'), verifyToken, updateProject);

export default router;
