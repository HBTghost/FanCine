import express from 'express';
import {
  getTheater,
  getAllTheaters,
  postSampleTheaters,
  createTheaterByForm,
} from '../middleware/theater.js';
import { ensureAdminApi } from '../config/checkAuth.js';
import ImageMiddleware from '../middleware/image.js';

const theaterRouter = express.Router();

theaterRouter.get('/:id', getTheater, (req, res) => {
  res.json(res.theater);
});

theaterRouter.get('/', getAllTheaters, (req, res) => {
  res.json(res.allTheaters);
});

theaterRouter.post('/utils/postSampleDatasets', ensureAdminApi, postSampleTheaters, (req, res) => {
  res.json(res.theaters);
});

theaterRouter.post(
  '/',
  ensureAdminApi,
  ImageMiddleware.upload,
  createTheaterByForm,
  async (req, res) => {
    res.redirect('/theaters');
  },
);

export default theaterRouter;
