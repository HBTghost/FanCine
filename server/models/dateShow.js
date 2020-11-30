import mongoose from 'mongoose';

const DateShowSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  _idTypeShows: [String],
});

export default mongoose.model('DateShow', DateShowSchema);
