import TheaterMovie from '../models/theater_movie.js';
import Movie from '../models/movie.js';
import Theater from '../models/theater.js';
import mongoose from 'mongoose';

async function getTheaterMovie(req, res, next) {
  try {
    res.theaterMovie = await TheaterMovie.findById(mongoose.Types.ObjectId(req.params.id));
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

async function getAllTheaterMovies(req, res, next) {
  try {
    res.allTheaterMovies = await TheaterMovie.find();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

async function postSampleTheaterMovie(req, res, next) {
  try {
    let theaterMovies = [];
    let theaterMovie;
    let movies = await Movie.find();
    let movieIDs = movies.map(movie => movie['_id']);
    let theaters = await Theater.find();
    let theaterIDs = theaters.map(theater => theater['_id']);
    
    for (let i = 0; i < theaterIDs.length; ++i) {
      for (let j = 0; j < movieIDs.length && j < i + 1; ++j) {
        theaterMovie = new TheaterMovie();
        theaterMovie['_idTheater'] = theaterIDs[i]
        theaterMovie['_idMovie'] = movieIDs[j];
        theaterMovies.push(theaterMovie);
      }
    }
    // theaterMovies.forEach(async theaterMovie => await theaterMovie.save());

    res.theaterMovies = theaterMovies;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

export {
  getTheaterMovie,
  getAllTheaterMovies,
  postSampleTheaterMovie
}