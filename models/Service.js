import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required.'], trim: true },
  description: { type: String, trim: true }
});

// Return "id" instead of the default "_id".
serviceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    return plainObject;
  }
});

export default mongoose.model('Service', serviceSchema);
