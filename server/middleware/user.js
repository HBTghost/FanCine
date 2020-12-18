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

export { addExpense, getAllUsers };
