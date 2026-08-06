import express from 'express';
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Reads are public; writes need a valid token.
router.route('/')
  .get(getAllProjects)
  .post(requireAuth, addProject);

router.route('/:id')
  .get(getProjectById)
  .put(requireAuth, updateProject)
  .delete(requireAuth, deleteProject);

export default router;
