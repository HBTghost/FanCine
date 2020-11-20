import mongoose from 'mongoose';

const Theater_Movie_Schema = mongoose.Schema({
  _idTheater: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  _idMovie: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

export default mongoose.model('TheaterMovie', Theater_Movie_Schema);