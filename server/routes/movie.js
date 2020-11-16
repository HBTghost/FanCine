import express from 'express';
import getMovie from '../middleware/movie.js';

const movieRouter = express.Router();

movieRouter.get('/:id', getMovie, (req, res) => {
  res.json(res.movie);
});

export default movieRouter;