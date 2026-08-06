import Reference from '../models/Reference.js';

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
