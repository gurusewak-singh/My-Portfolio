import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
// A_ Import the new cache middleware
import cache, { clearCache } from '../middleware/cacheMiddleware.js';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// A_ Apply the cache middleware ONLY to the GET all route.
// We'll cache the result for 1 hour (3600 seconds).
router.get('/', cache(3600), getProjects);

router.get('/:id', getProjectById);

// A_ Apply the clearCache middleware to all routes that MODIFY data.
// This ensures the cache is always fresh after a change.
router.post('/', clearCache, upload.single('image'), verifyToken, createProject);
router.put('/:id', clearCache, upload.single('image'), verifyToken, updateProject);
router.delete('/:id', clearCache, verifyToken, deleteProject);

export default router;