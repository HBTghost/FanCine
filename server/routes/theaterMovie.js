import express from 'express';
import {
  getTheaterMovie, getTheaterMoviesByMovieID, getAllTheaterMovies, postSampleTheaterMovie,
} from '../middleware/theaterMovie.js';

const theaterMovieRouter = express.Router();

theaterMovieRouter.get('/:id', getTheaterMovie, (req, res) => {
  res.json(res.theaterMovie);
});

theaterMovieRouter.get('/findByMovie/:id', getTheaterMoviesByMovieID, (req, res) => {
  res.json(res.theaterMovies);
});

theaterMovieRouter.get('/', getAllTheaterMovies, (req, res) => {
  res.json(res.allTheaterMovies);
});

theaterMovieRouter.post('/utils/postSampleDatasets', postSampleTheaterMovie, (req, res) => {
  res.json(res.theaterMovies);
});

export default theaterMovieRouter;
