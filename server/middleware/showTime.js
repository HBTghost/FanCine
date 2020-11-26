import ShowTime from '../models/showTime.js';
import Theater from '../models/theater.js';
import TheaterMovie from '../models/theaterMovie.js';

import toDateString from '../utils/date.js';

import mongoose from 'mongoose';

async function getShowTime(req, res, next) {
  try {
    res.showTime = await ShowTime.findById(mongoose.Types.ObjectId(req.params.id)).lean();
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
    let showTimes = [];
    const times = [ '10:00', '11:20', '13:40', '15:30', '17:40', '18:30', '19:40', '20:30' ];
    const types = [ '2D', '3D', 'Phụ đề' ];
    const randomInt = (min, max) => parseInt(min + Math.random() * (max - min), 10);
    let theaterMovies = await TheaterMovie.find();

    for await (let theaterMovie of theaterMovies) {
      let showTime = new ShowTime();
      let theater = await Theater.findById(theaterMovie['_idTheater']);
      showTime['_idTheaterMovie'] = theaterMovie['_id'];
      showTime['room'] = theater['rooms'][randomInt(0, theater['rooms'].length)];
      showTime['date'] = toDateString(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * randomInt(0, 20)));
      showTime['time'] = times[randomInt(0, times.length)];
      showTime['type'] = types[randomInt(0, types.length)];
      let w = randomInt(10, 14);
      let h = randomInt(6, 10);
      let state = [];
      for (let i = 0; i < h; ++i) {
        let row = [];
        for (let j = 0; j < w; ++j) {
          row.push(randomInt(0, 2));
        }
        state.push(row);
      }
      showTime['state'] = state;
      showTimes.push(showTime);
    }
    // showTimes.forEach(async showTime => await showTime.save());
    res.showTimes = showTimes;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getShowTime,
  getAllShowTimes,
  postSampleShowTimes
}