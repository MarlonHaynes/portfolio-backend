import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required.'], trim: true },
  completion: { type: Date },
  description: { type: String, trim: true },
  image: { type: String, trim: true }
});

// Return "id" instead of the default "_id".
projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    return plainObject;
  }
});

export default mongoose.model('Project', projectSchema);
