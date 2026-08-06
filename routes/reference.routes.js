import express from 'express';
import {
  getAllReferences,
  getReferenceById,
  addReference,
  updateReference,
  deleteReference
} from '../controllers/reference.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Reads are public; writes need a valid token.
router.route('/')
  .get(getAllReferences)
  .post(requireAuth, addReference);

router.route('/:id')
  .get(getReferenceById)
  .put(requireAuth, updateReference)
  .delete(requireAuth, deleteReference);

export default router;
