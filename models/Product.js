import mongoose, { Schema } from 'mongoose';

const Product = new Schema({
  asin: {
    type: String,
    lowercase: true,
    required: true,
  },
  category: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  rank: {
    type: String,
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


Product.pre('save', (next) => {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model('Product', Product);
