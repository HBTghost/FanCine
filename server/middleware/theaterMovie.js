import mongoose from 'mongoose';
import TheaterMovie from '../models/theaterMovie.js';
import Movie from '../models/movie.js';
import Theater from '../models/theater.js';

async function getTheaterMovie(req, res, next) {
  try {
    res.theaterMovie = await TheaterMovie.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}
async function getTheaterMovieByMovie(req, res, next) {
  try {
    res.theaterMovies = await TheaterMovie.find({
      _idMovie: mongoose.Types.ObjectId(req.params.id),
    }).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllTheaterMovies(req, res, next) {
  try {
    res.allTheaterMovies = await TheaterMovie.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function postSampleTheaterMovie(req, res, next) {
  try {
    const theaterMovies = [];
    let theaterMovie;
    const movies = await Movie.find();
    const movieIDs = movies.map((movie) => movie._id);
    const theaters = await Theater.find();
    const theaterIDs = theaters.map((theater) => theater._id);

    for (let i = 0; i < theaterIDs.length; ++i) {
      for (let j = 0; j < movieIDs.length && j < i + 1; ++j) {
        theaterMovie = new TheaterMovie();
        theaterMovie._idTheater = theaterIDs[i];
        theaterMovie._idMovie = movieIDs[j];
        theaterMovies.push(theaterMovie);
      }
    }
    // theaterMovies.forEach(async (_theaterMovie) => { await _theaterMovie.save(); });

    res.theaterMovies = theaterMovies;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getTheaterMovie,
  getTheaterMovieByMovie,
  getAllTheaterMovies,
  postSampleTheaterMovie,
};
