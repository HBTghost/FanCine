import mongoose from 'mongoose';

const DateShowSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  _idTypeShows: [mongoose.Types.ObjectId],
});

export default mongoose.model('DateShow', DateShowSchema);
