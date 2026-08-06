import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required.'], trim: true },
  testimonial: { type: String, required: [true, 'Testimonial is required.'], trim: true },
  position: { type: String, trim: true },
  company: { type: String, trim: true }
});

// Return "id" instead of the default "_id".
referenceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    return plainObject;
  }
});

export default mongoose.model('Reference', referenceSchema);
