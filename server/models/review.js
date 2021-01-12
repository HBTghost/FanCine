import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  vietnameseName: {
    type: String,
  },
  imageSource: String,
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdAtMili: {
    type: Number,
  },
  content: {
    type: String,
    required: true,
  },
  flag: String,
});

export default mongoose.model('Review', ReviewSchema);
