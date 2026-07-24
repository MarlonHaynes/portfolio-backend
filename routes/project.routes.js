/**
 * routes/project.routes.js
 * Endpoint definitions for the projects resource.
 * Mounted in app.js under the /api/projects base path.
 */
import express from 'express';
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js';

const router = express.Router();

router.route('/')
  .get(getAllProjects)   // GET    api/projects
  .post(addProject);     // POST   api/projects

router.route('/:id')
  .get(getProjectById)   // GET    api/projects/:id
  .put(updateProject)    // PUT    api/projects/:id
  .delete(deleteProject); // DELETE api/projects/:id

export default router;
