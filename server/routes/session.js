import express from 'express';
import { getSessionByID, insertSession } from '../middleware/session.js';

const sessionRouter = express.Router();

sessionRouter.get('/', (req, res) => {
  res.json(res.locals._idUser);
});

sessionRouter.post('/insertOne', insertSession, (req, res) => {});

export default sessionRouter;
