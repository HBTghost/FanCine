import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  vietnameseName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  rates: Number,
  label: {
    type: String,
    required: true,
    enum: ['P', 'C13', 'C16', 'C18'],
    default: 'P',
  },
  time: {
    type: String,
    required: true,
  },
  producer: String,
  category: {
    type: [String],
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  nation: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  trailerEmbedID: String,
  imageSource: String,
  horizontalImageSource: String,
});

export default mongoose.model('Movie', MovieSchema);
