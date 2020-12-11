import mongoose from 'mongoose';
import { Movie, Theater, TheaterMovie, DateShow, TypeShow } from '../models/index.js';
import { toDateString } from '../helpers/date.js';
import { randomIntMinMax } from '../helpers/tools.js';

async function getTheaterMovie(req, res, next) {
  try {
    res.theaterMovie = await TheaterMovie.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTheaterMovieRecursively(req, res, next) {
  try {
    const theaterMovie = await TheaterMovie.findById(mongoose.Types.ObjectId(req.params.id));
    const resultTheaterMovie = { _id: theaterMovie._id, dateShows: [] };
    for await (const _idDateShow of theaterMovie._idDateShows) {
      const dateShow = await DateShow.findById(_idDateShow);
      const resultDateShow = { _id: dateShow._id, value: dateShow.value, typeShows: [] };
      for await (const _idTypeShow of dateShow._idTypeShows) {
        const resultTypeShow = await TypeShow.findById(_idTypeShow);
        resultDateShow.typeShows.push(resultTypeShow);
      }
      resultTheaterMovie.dateShows.push(resultDateShow);
    }
    res.theaterMovie = resultTheaterMovie;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTheaterMoviesByMovieID(req, res, next) {
  try {
    res.theaterMovies = await TheaterMovie.find({
      _idMovie: mongoose.Types.ObjectId(req.params.id),
    }).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTheaterMoviesByTheaterID(req, res, next) {
  try {
    res.theaterMovies = await TheaterMovie.find({
      _idTheater: mongoose.Types.ObjectId(req.params.id),
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

    for (let i = 0; i < movieIDs.length; ++i) {
      for (let j = 0; j < theaterIDs.length && j < i + 2; ++j) {
        theaterMovie = new TheaterMovie();
        theaterMovie._idTheater = theaterIDs[j];
        theaterMovie._idMovie = movieIDs[i];

        const dates = new Set();
        const aDay = 24 * 60 * 60 * 1000;
        const numberOfDates = randomIntMinMax(0, 10);
        for (let k = 0; k < numberOfDates; ++k) {
          dates.add(toDateString(new Date(new Date().getTime() + aDay * (k + 30))));
        }

        for await (const date of [...dates]) {
          const dateShow = new DateShow();
          dateShow.value = date;

          const times = [
            '10:00',
            '11:20',
            '12:10',
            '13:40',
            '14:00',
            '14:50',
            '15:30',
            '16:20',
            '17:00',
            '17:40',
            '18:30',
            '19:40',
            '20:30',
            '21:00',
          ];
          const types = ['2D - Phụ đề', '2D - Lồng tiếng', '3D - Phụ đề', '3D - Lồng tiếng'];
          const timeShows = [[], [], [], []];

          for (const time of times) {
            const i1 = randomIntMinMax(0, types.length);
            const i2 = randomIntMinMax(0, types.length);
            timeShows[i1].push(time);
            if (i1 !== i2) {
              timeShows[i2].push(time);
            }
          }
          for (let m = 0; m < timeShows.length; ++m) {
            if (timeShows[m].length > 0) {
              const typeShow = new TypeShow();
              typeShow.value = types[m];
              typeShow.timeShows = timeShows[m];
              dateShow._idTypeShows.push(typeShow._id);
              // await typeShow.save();
            }
          }
          theaterMovie._idDateShows.push(dateShow._id);
          // await dateShow.save();
        }

        theaterMovies.push(theaterMovie);
        // await theaterMovie.save();
      }
    }

    res.theaterMovies = [];
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getTheaterMovie,
  getTheaterMovieRecursively,
  getTheaterMoviesByMovieID,
  getTheaterMoviesByTheaterID,
  getAllTheaterMovies,
  postSampleTheaterMovie,
};
