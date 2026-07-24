/**
 * models/Service.js
 * Mongoose model representing a service offered on the Services page.
 */
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required.'], trim: true },
  description: { type: String, trim: true }
});

/**
 * Serialise documents with an "id" attribute instead of the default "_id",
 * as required by the API response specification.
 */
serviceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    return plainObject;
  }
});

export default mongoose.model('Service', serviceSchema);
