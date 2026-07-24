/**
 * controllers/reference.controller.js
 * CRUD operations for the references collection.
 * Every handler forwards unexpected errors to the global error handler via next().
 */
import Reference from '../models/Reference.js';

/** GET /api/references — retrieve every reference. */
export const getAllReferences = async (req, res, next) => {
  try {
    const references = await Reference.find();
    res.status(200).json({
      success: true,
      message: 'References list retrieved successfully.',
      data: references
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/references/:id — retrieve a single reference by its identifier. */
export const getReferenceById = async (req, res, next) => {
  try {
    const reference = await Reference.findById(req.params.id);

    if (!reference) {
      return res.status(404).json({ success: false, message: 'Reference not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Reference retrieved successfully.',
      data: reference
    });
  } catch (error) {
    next(error);
  }
};

/** POST /api/references — create a new reference. */
export const addReference = async (req, res, next) => {
  try {
    const reference = await Reference.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Reference added successfully.',
      data: reference
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/references/:id — update an existing reference. */
export const updateReference = async (req, res, next) => {
  try {
    const updatedReference = await Reference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReference) {
      return res.status(404).json({ success: false, message: 'Reference not found.' });
    }

    res.status(200).json({ success: true, message: 'Reference updated successfully.' });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/references/:id — remove an existing reference. */
export const deleteReference = async (req, res, next) => {
  try {
    const deletedReference = await Reference.findByIdAndDelete(req.params.id);

    if (!deletedReference) {
      return res.status(404).json({ success: false, message: 'Reference not found.' });
    }

    res.status(200).json({ success: true, message: 'Reference deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
