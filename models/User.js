import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, 'First name is required.'], trim: true },
  lastname: { type: String, required: [true, 'Last name is required.'], trim: true },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    lowercase: true
  },
  password: { type: String, required: [true, 'Password is required.'] },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
});

// Hash the password before saving, only when it changed (so profile
// updates don't re-hash an already hashed value).
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function comparePassword(plainText) {
  return bcrypt.compare(plainText, this.password);
};

// Return "id" instead of "_id", and never expose the password hash.
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, plainObject) => {
    delete plainObject._id;
    delete plainObject.password;
    return plainObject;
  }
});

export default mongoose.model('User', userSchema);
