/**
 * controllers/user.controller.js
 * CRUD operations for the users collection.
 * Every handler forwards unexpected errors to the global error handler via next().
 */
import User from '../models/User.js';

/** GET /api/users — retrieve every user. */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: 'Users list retrieved successfully.',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/users/:id — retrieve a single user by its identifier. */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully.',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/** POST /api/users — create a new user. */
export const addUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body, created: Date.now() });
    res.status(201).json({
      success: true,
      message: 'User added successfully.',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/users/:id — update an existing user and stamp the updated date. */
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully.' });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/users/:id — remove an existing user. */
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
