import mongoose from 'mongoose';
import TypeShow from '../models/typeShow.js';

async function getType(req, res, next) {
  try {
    res.typeShow = await TypeShow.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTypesFromDateShows(req, res, next) {
  try {
    res.typeShows = [];
    for await (const dateShow of res.dateShows) {
      res.typeShows.push(await TypeShow.findById(mongoose.Types.ObjectId(dateShow)).lean());
    }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllDates(req, res, next) {
  try {
    res.allDates = await TypeShow.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getType,
  getTypesFromDateShows,
  getAllDates,
};
