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

async function getFilteredSessionsFromUser(req, res, next) {
  try {
    if (req.body.startDate !== undefined) {
      res.filterForm = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        orderType: req.body.orderType,
      };
    }

    const d = new Date();
    switch (req.body.orderType) {
      case '0':
        res.sessions = await Session.find({
          _idUser: mongoose.Types.ObjectId(req.user._id),
          createdAtMili: {
            $gte:
              new Date(`${req.body.startDate}T00:00:00`).getTime() +
              parseInt(req.body.timezoneOffsetMili, 10),
            $lte:
              new Date(`${req.body.endDate}T23:59:59`).getTime() +
              parseInt(req.body.timezoneOffsetMili, 10),
          },
        })
          .sort({ createdAt: 'desc' })
          .lean();
        break;

      case '1':
        res.sessions = await Session.find({
          _idUser: mongoose.Types.ObjectId(req.user._id),
          createdAtMili: {
            $gte:
              new Date(`${req.body.startDate}T00:00:00`).getTime() +
              parseInt(req.body.timezoneOffsetMili, 10),
            $lte:
              new Date(`${req.body.endDate}T23:59:59`).getTime() +
              parseInt(req.body.timezoneOffsetMili, 10),
          },
        })
          .sort({ createdAt: 'asc' })
          .lean();
        break;

      default:
        res.sessions = await Session.find({
          _idUser: mongoose.Types.ObjectId(req.user._id),
          createdAtMili: {
            $gte:
              new Date(`${d.getFullYear()}-01-01T00:00:00`).getTime() +
              parseInt(`${-420 * 60 * 1000}`, 10),
            $lte: new Date(d).getTime(),
          },
        })
          .sort({ createdAt: 'desc' })
          .lean();
    }
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
    session.createdAt = Date.now();
    session.createdAtMili = session.createdAt.getTime();
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

export { getSessionByID, getSessionsByUser, getFilteredSessionsFromUser, insertSession };
