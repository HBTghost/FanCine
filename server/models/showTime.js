import mongoose from 'mongoose';

const ShowTimeSchema = mongoose.Schema({
  _idTheaterMovie: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  _idDateShow: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  _idTypeShow: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  state: {
    type: [[Boolean]],
    required: true,
  },
});

export default mongoose.model('ShowTime', ShowTimeSchema);
