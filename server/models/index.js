import mongoose from 'mongoose';
import Movie from './movie.js';
import Theater from './theater.js';
import TheaterMovie from './theaterMovie.js';
import DateShow from './dateShow.js';
import TypeShow from './typeShow.js';
import ShowTime from './showTime.js';

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export { Movie, Theater, TheaterMovie, DateShow, TypeShow, ShowTime, isValidId };
