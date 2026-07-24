/**
 * config/db.js
 * Establishes the connection to the MongoDB Atlas cluster using Mongoose.
 * The connection string must target the database named "portfolio".
 */
import mongoose from 'mongoose';

const connectDatabase = async () => {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    throw new Error('MONGODB_URI is not defined. Add it to your .env file.');
  }

  const connection = await mongoose.connect(connectionString);
  console.log(`Connected to MongoDB Atlas — database: ${connection.connection.name}`);

  // Surface any connection errors that occur after the initial handshake.
  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
  });

  return connection;
};

export default connectDatabase;
