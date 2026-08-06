import mongoose from 'mongoose';

// Connect to MongoDB Atlas. The connection string points at the "portfolio" database.
const connectDatabase = async () => {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    throw new Error('MONGODB_URI is not defined. Add it to your .env file.');
  }

  const connection = await mongoose.connect(connectionString);
  console.log(`Connected to MongoDB Atlas — database: ${connection.connection.name}`);

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error.message);
  });

  return connection;
};

export default connectDatabase;
