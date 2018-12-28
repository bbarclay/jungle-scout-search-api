import mongoose, { Schema } from 'mongoose';

const Search = new Schema({
  asin: {
    type: String,
    lowercase: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  rank: {
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


Search.pre('save', (next) => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model('Search', Search);
