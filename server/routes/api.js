import express from 'express';

// This file is now simplified. We can use it for a health check or remove it.
// For now, let's keep it minimal to avoid conflicts.
const router = express.Router();

// A simple health check route to confirm the API is up.
router.get('/health', (req, res) => {
  res.json({ status: 'API is running' });
});

export default router;