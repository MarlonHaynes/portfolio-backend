import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Reads and sign-up (POST) are public; updates and deletes need a token.
router.route('/')
  .get(getAllUsers)
  .post(addUser);

router.route('/:id')
  .get(getUserById)
  .put(requireAuth, updateUser)
  .delete(requireAuth, deleteUser);

export default router;
