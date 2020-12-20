import mongoose from 'mongoose';
import { User } from '../models/index.js';

async function addExpense(req, res, next) {
  try {
    const user = await User.findById(mongoose.Types.ObjectId(req.user._id));
    user.spending += res.totalPrice;
    await user.save();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllUsers(req, res, next) {
  try {
    res.allUsers = await User.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllUsersBySorting(req, res, next) {
  try {
    const COL = Object.freeze({
      ROLE: 0,
      NAME: 1,
      EMAIL: 2,
      PHONE_NUM: 3,
      DOB: 4,
      GENDER: 5,
      ADDRESS: 6,
      CITY: 7,
      AREA: 8,
      STAR: 9,
      EXPENSE: 10,
      ID: 11,
    });

    let attribute;
    switch (parseInt(req.params.colIndex, 10)) {
      case COL.ROLE:
        attribute = 'role';
        break;
      case COL.NAME:
        attribute = 'name';
        break;
      case COL.EMAIL:
        attribute = 'email';
        break;
      case COL.PHONE_NUM:
        attribute = 'phone';
        break;
      case COL.DOB:
        attribute = 'DoB';
        break;
      case COL.GENDER:
        attribute = 'sex';
        break;
      case COL.ADDRESS:
        attribute = 'address';
        break;
      case COL.CITY:
        attribute = 'city';
        break;
      case COL.AREA:
        attribute = 'town';
        break;
      case COL.STAR:
        attribute = 'point';
        break;
      case COL.EXPENSE:
        attribute = 'spending';
        break;
      default:
        attribute = '_id';
        break;
    }

    res.allUsers = await User.find()
      .sort({ [`${attribute}`]: [req.params.sortType === '0' ? 'asc' : 'desc'] })
      .lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export { addExpense, getAllUsers, getAllUsersBySorting };
