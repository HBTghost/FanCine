import express from 'express';
import { insertSession } from '../middleware/session.js';
import addExpense from '../middleware/user.js';
import { ensureAuthenticated } from '../config/checkAuth.js';
import { updateSeats } from '../middleware/showTime.js';

const sessionRouter = express.Router();

sessionRouter.get('/', (req, res) => {
  res.json(res.locals._idUser);
});

sessionRouter.post(
  '/insertOne',
  ensureAuthenticated,
  insertSession,
  updateSeats,
  addExpense,
  (req, res) => {},
);

export default sessionRouter;
