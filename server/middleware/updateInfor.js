import mongoose from 'mongoose';
import User from '../models/user.js';

async function updateUserInfor(req, res, next) {
  try {
    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        name: req.body.fullName,
        phone: req.body.phoneNumber,
        DoB: req.body.birthdate,
        sex: req.body.gender,
        address: req.body.address,
        city: req.body.province,
        town: req.body.district,
      },
    );
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export default updateUserInfor;
