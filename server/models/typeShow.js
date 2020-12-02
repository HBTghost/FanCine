import mongoose from 'mongoose';

const TypeShowSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  timeShows: [String],
});

export default mongoose.model('TypeShow', TypeShowSchema);
