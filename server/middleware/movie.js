import Movie from '../models/movie.js';
import mongoose from 'mongoose';

async function getMovie(req, res, next) {
  try {
    res.movie = await Movie.findById(mongoose.Types.ObjectId(req.params.id));
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}
export default getMovie;