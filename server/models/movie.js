import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  vietnameseName: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
    enum: ['P', 'C13', 'C16','C18']
  },
  description: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  cast: {
    type: [String],
    required: true
  },
  nation: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  rating: Number,
  rates: Number
});

export default mongoose.model('Movie', MovieSchema);