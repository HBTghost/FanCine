import mongoose from 'mongoose';
import { DateShow, TheaterMovie } from '../models/index.js';

async function getDateShow(req, res, next) {
  try {
    res.dateShow = await DateShow.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getDateShowsFromTheaterMovieID(req, res, next) {
  try {
    res.dateShows = [];
    const theaterMovie = await TheaterMovie.findById(mongoose.Types.ObjectId(req.params.id)).lean();
    if (theaterMovie !== undefined) {
      for await (const id of theaterMovie._idDates) {
        res.dateShows.push(await DateShow.findById(mongoose.Types.ObjectId(id)).lean());
      }
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllDateShows(req, res, next) {
  try {
    res.allDateShows = await DateShow.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getDateShow,
  getDateShowsFromTheaterMovieID,
  getAllDateShows,
};
