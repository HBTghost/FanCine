import express from 'express';
import { getMovie, getAllMovies, postSampleMovies } from '../middleware/movie.js';

const movieRouter = express.Router();

movieRouter.get('/:id', getMovie, (req, res) => {
  res.json(res.movie);
});

movieRouter.get('/', getAllMovies, (req, res) => {
  res.json(res.allMovies);
});

movieRouter.get('/utils/postSampleDatasets', postSampleMovies, (req, res) => {
  res.json(res.movies);
});

export default movieRouter;