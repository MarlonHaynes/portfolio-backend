/**
 * routes/user.routes.js
 * Endpoint definitions for the users resource.
 * Mounted in app.js under the /api/users base path.
 */
import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.route('/')
  .get(getAllUsers)   // GET    api/users
  .post(addUser);     // POST   api/users

router.route('/:id')
  .get(getUserById)   // GET    api/users/:id
  .put(updateUser)    // PUT    api/users/:id
  .delete(deleteUser); // DELETE api/users/:id

export default router;
