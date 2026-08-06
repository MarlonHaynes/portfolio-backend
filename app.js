import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';

import referenceRoutes from './routes/reference.routes.js';
import projectRoutes from './routes/project.routes.js';
import serviceRoutes from './routes/service.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Allow the React frontend to call the API, including its Bearer token.
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio backend API is running.',
    endpoints: ['/api/references', '/api/projects', '/api/services', '/api/users', '/api/auth']
  });
});

app.use('/api/references', referenceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Unknown route -> 404.
app.use((req, res, next) => {
  next(createError(404, `Endpoint not found: ${req.method} ${req.originalUrl}`));
});

// Global error handler — keeps every error response in the same shape.
app.use((err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid identifier provided: ${err.value}`
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((item) => item.message).join(' ')
    });
  }

  // Duplicate key (e.g. an email that already exists) -> 409 instead of 500.
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `That ${field} is already registered.`
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.'
  });
});

export default app;
