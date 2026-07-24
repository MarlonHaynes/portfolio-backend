/**
 * routes/reference.routes.js
 * Endpoint definitions for the references resource.
 * Mounted in app.js under the /api/references base path.
 */
import express from 'express';
import {
  getAllReferences,
  getReferenceById,
  addReference,
  updateReference,
  deleteReference
} from '../controllers/reference.controller.js';

const router = express.Router();

router.route('/')
  .get(getAllReferences)   // GET    api/references
  .post(addReference);     // POST   api/references

router.route('/:id')
  .get(getReferenceById)   // GET    api/references/:id
  .put(updateReference)    // PUT    api/references/:id
  .delete(deleteReference); // DELETE api/references/:id

export default router;
