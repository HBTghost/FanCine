import mongoose from 'mongoose';
import TypeShow from '../models/typeShow.js';

async function getTypeShow(req, res, next) {
  try {
    res.typeShow = await TypeShow.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getTypeShowsFromDateShows(req, res, next) {
  try {
    res.typeShows = [];
    res.dateTypes = {};
    // for await (const dateShow of res.dateShows) {
    // const dateTypes = {};
    // const types = await TypeShow.findById(mongoose.Types.ObjectId(dateShow)).lean();
    // for (let type of types) {
    //   dataTypes[type.value] =
    // }
    // }
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllTypeShows(req, res, next) {
  try {
    res.allTypes = await TypeShow.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export {
  getTypeShow,
  getTypeShowsFromDateShows,
  getAllTypeShows,
};
