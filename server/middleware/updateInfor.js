import mongoose from 'mongoose';
import User from '../models/user.js';

async function updateUserInfor(req, res, next) {
  try {
    // console.log(req.body);
    // console.log(req.body.email);
    await User.findOneAndUpdate({ email: req.body.email }, { name: req.body.fullName });
    // User.findOne({ email: req.body.email }, (err, result) => {
    //   console.log('This is result');
    //   console.log(result);
    // });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export default updateUserInfor;
