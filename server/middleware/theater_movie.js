import TheaterMovie from '../models/theater_movie';
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

async function postSampleMovies(req, res, next) {
  try {
    let theaterMovies = [];
    // let theaterMovie = new TheaterMovie();

    // theaterMovies.forEach(async theaterMovie => await theaterMovie.save());

    res.theaterMovies = theaterMovies;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}