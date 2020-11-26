import express from 'express';
import { getTheater, getAllTheaters, postSampleTheaters } from '../middleware/theater.js';

const theaterRouter = express.Router();

theaterRouter.get('/:id', getTheater, (req, res) => {
  res.json(res.theater);
});

theaterRouter.get('/', getAllTheaters, (req, res) => {
  res.json(res.allTheaters);
});

theaterRouter.post('/utils/postSampleDatasets', postSampleTheaters, (req, res) => {
  res.json(res.theaters);
});

export default theaterRouter;
