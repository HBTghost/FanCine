import mongoose from 'mongoose';

const SessionSchema = mongoose.Schema({
  _idUser: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  _idShowtime: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdAtMili: {
    type: Number,
  },
  ticketInfo: {
    type: String,
    required: true,
  },
  comboInfo: String,
  seatInfo: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Session', SessionSchema);
