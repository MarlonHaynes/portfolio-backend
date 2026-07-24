/**
 * app.js
 * Express application configuration.
 * Registers middleware, mounts the API routers, and defines the
 * global error handler as the final middleware in the stack.
 */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';

import referenceRoutes from './routes/reference.routes.js';
import projectRoutes from './routes/project.routes.js';
import serviceRoutes from './routes/service.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

/* ---------------------------------- Middleware --------------------------------- */

// Allow cross-origin requests so the Assignment 1 React frontend can consume this API.
app.use(cors());

// HTTP request logger for development visibility.
app.use(morgan('dev'));

// Parse incoming JSON and URL-encoded request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------------------------ Routes ----------------------------------- */

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio backend API is running.',
    endpoints: ['/api/references', '/api/projects', '/api/services', '/api/users']
  });
});

app.use('/api/references', referenceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

/* -------------------------------- Error handling ------------------------------- */

// Any request that reaches this point matched no route, so forward a 404 error.
app.use((req, res, next) => {
  next(createError(404, `Endpoint not found: ${req.method} ${req.originalUrl}`));
});

/**
 * Global error handler.
 * Registered last so that every error forwarded via next(error) is caught here
 * and returned to the client in a consistent response shape.
 */
app.use((err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;

  // Mongoose casting failure on a malformed ObjectId.
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid identifier provided: ${err.value}`
    });
  }

  // Mongoose schema validation failure.
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((item) => item.message).join(' ')
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.'
  });
});

export default app;
