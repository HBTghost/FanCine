import mongoose from 'mongoose';

const TheaterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rooms: {
    type: [String],
    required: true,
  },
  mapEmbedID: String,
});

export default mongoose.model('Theater', TheaterSchema);
