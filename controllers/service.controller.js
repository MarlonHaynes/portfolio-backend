/**
 * controllers/service.controller.js
 * CRUD operations for the services collection.
 * Every handler forwards unexpected errors to the global error handler via next().
 */
import Service from '../models/Service.js';

/** GET /api/services — retrieve every service. */
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      success: true,
      message: 'Services list retrieved successfully.',
      data: services
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/services/:id — retrieve a single service by its identifier. */
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Service retrieved successfully.',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

/** POST /api/services — create a new service. */
export const addService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Service added successfully.',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/services/:id — update an existing service. */
export const updateService = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.status(200).json({ success: true, message: 'Service updated successfully.' });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/services/:id — remove an existing service. */
export const deleteService = async (req, res, next) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.status(200).json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
