import mongoose from 'mongoose';
import Account from './account.js';
import RefreshToken from './refreshToken.js';
import Movie from './movie.js';
import Theater from './theater.js';
import TheaterMovie from './theaterMovie.js';
import DateShow from './dateShow.js';
import TypeShow from './typeShow.js';
import ShowTime from './showTime.js';

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export {
  Account,
  RefreshToken,
  Movie,
  Theater,
  TheaterMovie,
  DateShow,
  TypeShow,
  ShowTime,
  isValidId,
};
