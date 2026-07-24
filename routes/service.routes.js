/**
 * routes/service.routes.js
 * Endpoint definitions for the services resource.
 * Mounted in app.js under the /api/services base path.
 */
import express from 'express';
import {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} from '../controllers/service.controller.js';

const router = express.Router();

router.route('/')
  .get(getAllServices)   // GET    api/services
  .post(addService);     // POST   api/services

router.route('/:id')
  .get(getServiceById)   // GET    api/services/:id
  .put(updateService)    // PUT    api/services/:id
  .delete(deleteService); // DELETE api/services/:id

export default router;
