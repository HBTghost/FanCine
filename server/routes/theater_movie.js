import express from 'express';
import { getTheaterMovie, getAllTheaterMovies, postSampleTheaterMovie } from '../middleware/theater_movie.js';

const theaterMovieRouter = express.Router();

theaterMovieRouter.get('/:id', getTheaterMovie, (req, res) => {
  res.json(res.movie);
});

theaterMovieRouter.get('/', getAllTheaterMovies, (req, res) => {
  res.json(res.allMovies);
});

theaterMovieRouter.post('/utils/postSampleDatasets', postSampleTheaterMovie, (req, res) => {
  res.json(res.theaterMovies);
});

export default theaterMovieRouter;