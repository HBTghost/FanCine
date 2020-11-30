import mongoose from 'mongoose';

const TypeShowSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  _idTimeShows: [String],
});

export default mongoose.model('TypeShow', TypeShowSchema);
