import mongoose from 'mongoose';

const Theater_Movie_Schema = mongoose.Schema({
  _idTheater: mongoose.Types.ObjectId,
  _idMovie: mongoose.Types.ObjectId
});

export default mongoose.model('TheaterMovie', Theater_Movie_Schema);