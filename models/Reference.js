/**
 * models/Reference.js
 * Mongoose model representing a testimonial shown on the References page.
 */
import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required.'], trim: true },
  testimonial: { type: String, required: [true, 'Testimonial is required.'], trim: true },
  position: { type: String, trim: true },
  company: { type: String, trim: true }
});

/**
 * Serialise documents with an "id" attribute instead of the default "_id",
 * as required by the API response specification.
 */
referenceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    return plainObject;
  }
});

export default mongoose.model('Reference', referenceSchema);
