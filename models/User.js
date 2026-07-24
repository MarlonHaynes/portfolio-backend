/**
 * models/User.js
 * Mongoose model representing an application user.
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, 'First name is required.'], trim: true },
  lastname: { type: String, required: [true, 'Last name is required.'], trim: true },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    lowercase: true,
    unique: true
  },
  password: { type: String, required: [true, 'Password is required.'] },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
});

/**
 * Serialise documents with an "id" attribute instead of the default "_id",
 * as required by the API response specification.
 */
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    return plainObject;
  }
});

export default mongoose.model('User', userSchema);
