import express from 'express';
import mongoose from 'mongoose';
import { ensureAdminApi } from '../config/checkAuth.js';
import { User } from '../models/index.js';

const userRouter = express.Router();

userRouter.delete('/:id', ensureAdminApi, async (req, res) => {
  try {
    const adminID = JSON.stringify(req.user._id).slice(1, -1);
    if (req.params.id === adminID) {
      res.status(403).json({ message: 'Forbidden' });
    } else {
      await User.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));
      res.json({});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRouter;
