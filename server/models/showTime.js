import mongoose from 'mongoose';

const ShowTimeSchema = mongoose.Schema({
  _idTheaterMovie: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  state: {
    type: [[Boolean]],
    required: true,
  },
});

export default mongoose.model('ShowTime', ShowTimeSchema);
