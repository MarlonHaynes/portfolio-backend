/**
 * models/Project.js
 * Mongoose model representing a portfolio project entry.
 */
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required.'], trim: true },
  completion: { type: Date },
  description: { type: String, trim: true },
  image: { type: String, trim: true }
});

/**
 * Serialise documents with an "id" attribute instead of the default "_id",
 * as required by the API response specification.
 */
projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    return plainObject;
  }
});

export default mongoose.model('Project', projectSchema);
