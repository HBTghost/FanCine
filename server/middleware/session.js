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

async function getSessionsByUser(req, res, next) {
  try {
    res.sessions = await Session.find({ _idUser: mongoose.Types.ObjectId(req.user._id) }).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getSessionsByUserOrderByCreatedAtDesc(req, res, next) {
  try {
    res.sessions = await Session.find({ _idUser: mongoose.Types.ObjectId(req.user._id) })
      .sort({ createdAt: 'desc' })
      .lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function insertSession(req, res, next) {
  try {
    res.totalPrice = req.body.totalPrice;

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
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export { getSessionByID, getSessionsByUser, getSessionsByUserOrderByCreatedAtDesc, insertSession };
