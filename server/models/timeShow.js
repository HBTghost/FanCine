import mongoose from 'mongoose';

const TimeShowSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

export default mongoose.model('TimeShow', TimeShowSchema);
