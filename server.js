/**
 * server.js
 * Entry point of the application.
 * Loads environment variables, establishes the MongoDB Atlas connection,
 * and starts the Express server on the configured port (defaults to 3000).
 */
import 'dotenv/config';
import app from './app.js';
import connectDatabase from './config/db.js';

// Render (and most cloud hosts) inject their own PORT value at runtime.
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
    process.exit(1);
  }
};

startServer();
