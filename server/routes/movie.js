import express from 'express';
import mongoose from 'mongoose';
import { Movie } from '../models/index.js';
import { ensureAdminApi } from '../config/checkAuth.js';
import {
  getMovie,
  getAllMovies,
  createMovieByForm,
  postSampleMovies,
} from '../middleware/movie.js';
import ImageMiddleware from '../middleware/image.js';

const movieRouter = express.Router();

movieRouter.get('/:id', getMovie, (req, res) => {
  res.json(res.movie);
});

movieRouter.get('/', getAllMovies, (req, res) => {
  res.json(res.allMovies);
});

movieRouter.post(
  '/',
  ensureAdminApi,
  ImageMiddleware.upload,
  createMovieByForm,
  async (req, res) => {
    res.redirect(`/info/${res._id}`);
  },
);

movieRouter.post('/utils/postSampleDatasets', ensureAdminApi, postSampleMovies, (req, res) => {
  res.json(res.movies);
});

movieRouter.delete('/:id', ensureAdminApi, async (req, res) => {
  try {
    await Movie.findById(mongoose.Types.ObjectId(req.params.id));
    // await Movie.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));
    res.json({});
  } catch (err) {
    res.status(500).json(err);
  }
});

export default movieRouter;
