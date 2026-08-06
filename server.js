// Entry point: connect to MongoDB, then start the server.
import 'dotenv/config';
import app from './app.js';
import connectDatabase from './config/db.js';

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
