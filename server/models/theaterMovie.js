import mongoose from 'mongoose';

const TheaterMovieSchema = mongoose.Schema({
  _idTheater: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  _idMovie: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  _idDates: [String],
});

export default mongoose.model('TheaterMovie', TheaterMovieSchema);
