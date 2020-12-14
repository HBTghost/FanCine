import mongoose from 'mongoose';
import { Session } from '../models/index.js';

async function getSessionByID(req, res, next) {
  try {
    res.session = await Session.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function insertSession(req, res, next) {
  try {
    console.log('Hello');
    console.log(req.body);
    const session = new Session();
    session._idUser = mongoose.Types.ObjectId(req.user._id);
    session._idShowtime = mongoose.Types.ObjectId(req.body._idShowtime);
    session.ticketInfo = req.body.ticketInfo;
    session.comboInfo = req.body.comboInfo;
    session.seatInfo = req.body.seatInfo;
    session.totalPrice = req.body.totalPrice;
    session.paymentMethod = req.body.paymentMethod;
    res.session = await session.save();
  } catch (err) {
    console.log(res.status(err.status || 500).json({ message: err.message }));
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export { getSessionByID, insertSession };
