import mongoose from 'mongoose';
import ShowTime from '../models/showTime.js';
import Theater from '../models/theater.js';
import TheaterMovie from '../models/theaterMovie.js';
import DateShow from '../models/dateShow.js';
import TypeShow from '../models/typeShow.js';

import { randomIntMinMax } from '../utils/tools.js';

async function getShowTime(req, res, next) {
  try {
    res.showTime = await ShowTime.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getDatesByTheaterMovie(req, res, next) {
  try {
    await ShowTime.find({
      '_idTheaterMovie': mongoose.Types.ObjectId(req.params.id),
    }).distinct('date', (error, dates) => {
      res.dates = dates;
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTypesByTheaterMovie(req, res, next) {
  try {
    await ShowTime.find({
      '_idTheaterMovie': mongoose.Types.ObjectId(req.params.id),
    }).distinct('type', (error, types) => {
      res.types = types;
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getShowTimesAndPropsByTheaterMovie(req, res, next) {
  try {
    const results = {};
    for await (const date of res.dates) {
      const dateObj = {};
      for await (const type of res.types) {
        const timeObj = {};
        const showTime = await ShowTime.find({
          'date': date,
          'type': type,
        }).lean();
        for (const x of showTime) {
          timeObj[x.time] = x._id;
        }
        dateObj[type] = timeObj;
      }
      results[date] = dateObj;
    }
    res.showTimes = results;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
  res.status(200);
  return next();
}

async function getAllShowTimes(req, res, next) {
  try {
    res.allShowTimes = await ShowTime.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function postSampleShowTimes(req, res, next) {
  try {
    const theaterMovies = await TheaterMovie.find();
    for await (const theaterMovie of theaterMovies) {
      const _idTheaterMovie = theaterMovie._id;
      const theater = await Theater.findById(theaterMovie._idTheater);
      for await (const _idDateShow of theaterMovie._idDateShows) {
        const dateShow = await DateShow.findById(_idDateShow);
        for await (const _idTypeShow of dateShow._idTypeShows) {
          const typeShow = await TypeShow.findById(_idTypeShow);
          for await (const time of typeShow.timeShows) {
            const w = randomIntMinMax(10, 14);
            const h = randomIntMinMax(6, 10);
            const state = [];
            for (let i = 0; i < h; ++i) {
              const row = [];
              for (let j = 0; j < w; ++j) {
                row.push(randomIntMinMax(0, 2) === 1);
              }
              state.push(row);
            }

            const showTime = new ShowTime();
            showTime._idTheaterMovie = _idTheaterMovie;
            showTime._idDateShow = _idDateShow;
            showTime._idTypeShow = _idTypeShow;
            showTime.time = time;
            showTime.room = theater.rooms[randomIntMinMax(0, theater.rooms.length)];
            showTime.state = state;

            // await showTime.save();
          }
        }
      }
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getShowTime,
  getDatesByTheaterMovie,
  getTypesByTheaterMovie,
  getShowTimesAndPropsByTheaterMovie,
  getAllShowTimes,
  postSampleShowTimes,
};
