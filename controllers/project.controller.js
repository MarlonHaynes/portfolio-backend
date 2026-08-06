import Project from '../models/Project.js';

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      message: 'Projects list retrieved successfully.',
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully.',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const addProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Project added successfully.',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.status(200).json({ success: true, message: 'Project updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.status(200).json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
