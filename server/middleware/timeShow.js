import mongoose from 'mongoose';
import TimeShow from '../models/timeShow.js';

async function getTimeShow(req, res, next) {
  try {
    res.timeShow = await TimeShow.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTimeShowsFromDateShows(req, res, next) {
  try {
    res.timeShows = [];
    res.dateTypes = {};
    // for await (const dateShow of res.dateShows) {
    // const dateTypes = {};
    // const types = await TimeShow.findById(mongoose.Types.ObjectId(dateShow)).lean();
    // for (let type of types) {
    //   dataTypes[type.value] =
    // }
    // }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllTimeShows(req, res, next) {
  try {
    res.allTypes = await TimeShow.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getTimeShow,
  getTimeShowsFromDateShows,
  getAllTimeShows,
};
