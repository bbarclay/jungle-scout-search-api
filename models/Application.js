import mongoose, { Schema } from 'mongoose';

const Application = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

Application.pre('save', (next) => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model('Application', Application);
