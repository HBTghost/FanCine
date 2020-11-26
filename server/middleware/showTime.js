import ShowTime from '../models/showTime.js';
import Theater from '../models/theater.js';
import TheaterMovie from '../models/theater_movie.js';
import mongoose from 'mongoose';
import { toDateString } from '../utils/date.js';

async function getShowTime(req, res, next) {
  try {
    res.showTime = await ShowTime.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

async function getAllShowTimes(req, res, next) {
  try {
    res.allShowTimes = await ShowTime.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

async function postSampleShowTimes(req, res, next) {
  try {
    let showTimes = [];
    const times = [ '10:00', '11:20', '13:40', '15:30', '17:40', '18:30', '19:40', '20:30' ];
    const types = [ '2D', '3D', 'Phụ đề' ];
    const randomInt = (min, max) => parseInt(min + Math.random()*(max - min));
    let theaters_movies = await TheaterMovie.find();

    for await (let theater_movie of theaters_movies) {
      let showTime = new ShowTime();
      let theater = await Theater.findById(theater_movie['_idTheater']);
      showTime['_idTheaterMovie'] = theater_movie['_id'];
      showTime['room'] = theater['rooms'][randomInt(0, theater['rooms'].length)];
      showTime['date'] = toDateString(new Date(new Date().getTime() + 24*60*60*1000*randomInt(0, 20)));
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

  next();
}

export {
  getShowTime,
  getAllShowTimes,
  postSampleShowTimes
}