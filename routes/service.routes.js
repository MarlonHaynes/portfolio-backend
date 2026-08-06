import express from 'express';
import {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} from '../controllers/service.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Reads are public; writes need a valid token.
router.route('/')
  .get(getAllServices)
  .post(requireAuth, addService);

router.route('/:id')
  .get(getServiceById)
  .put(requireAuth, updateService)
  .delete(requireAuth, deleteService);

export default router;
