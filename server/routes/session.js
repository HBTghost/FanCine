import express from 'express';
import { insertSession } from '../middleware/session.js';
import addExpense from '../middleware/user.js';

const sessionRouter = express.Router();

sessionRouter.get('/', (req, res) => {
  res.json(res.locals._idUser);
});

sessionRouter.post('/insertOne', insertSession, addExpense, (req, res) => {});

export default sessionRouter;
