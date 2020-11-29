import mongoose from 'mongoose';
import ShowTime from '../models/showTime.js';
import Theater from '../models/theater.js';
import TheaterMovie from '../models/theaterMovie.js';

import toDateString from '../utils/date.js';

async function getShowTime(req, res, next) {
  try {
    res.showTime = await ShowTime.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getShowTimesAndPropsByTheaterMovie(req, res, next) {
  try {
    const showTimes = ShowTime.find();
    await showTimes.distinct('date', (error, dates) => {
      res.dates = dates;
      console.log(dates);
    });
    await showTimes.distinct('type', (error, types) => {
      res.types = types;
      console.log(types);
    });
    const results = {};
    for await (const date of res.dates) {
      const dateObj = {};
      for await (const type of res.types) {
        const timeObj = {};
        const showTime = await showTimes.find({ date, type }).lean();
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
    const showTimes = [];
    const times = ['10:00', '11:20', '13:40', '15:30', '17:40', '18:30', '19:40', '20:30'];
    const types = ['2D', '3D', 'Phụ đề'];
    const randomInt = (min, max) => parseInt(min + Math.random() * (max - min), 10);
    const theaterMovies = await TheaterMovie.find();

    for await (const theaterMovie of theaterMovies) {
      let mySet = new Set();
      for (const type of types) {
        for (const time of times) {
          mySet.add(JSON.stringify({
            type,
            time: times[randomInt(0, types.length)],
          }));
          console.log(time);
        }
      }
      mySet = [...mySet].map((obj) => JSON.parse(obj));
      for await (const set of mySet) {
        const showTime = new ShowTime();
        const theater = await Theater.findById(theaterMovie._idTheater);
        showTime._idTheaterMovie = theaterMovie._id;
        showTime.room = theater.rooms[randomInt(0, theater.rooms.length)];
        showTime.date = toDateString(
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * randomInt(0, 10)),
        );
        showTime.time = set.time;
        showTime.type = set.type;
        const w = randomInt(10, 14);
        const h = randomInt(6, 10);
        const state = [];
        for (let i = 0; i < h; ++i) {
          const row = [];
          for (let j = 0; j < w; ++j) {
            row.push(randomInt(0, 2));
          }
          state.push(row);
        }
        showTime.state = state;
        showTimes.push(showTime);
      }
    }
    // showTimes.forEach(async (showTime) => { await showTime.save(); });
    res.showTimes = showTimes;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getShowTime,
  getShowTimesAndPropsByTheaterMovie,
  getAllShowTimes,
  postSampleShowTimes,
};
