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
  getAllTimeShows,
};
