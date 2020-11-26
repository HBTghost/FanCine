import express from 'express';

import { getAllMovies } from '../middleware/movie.js';

const handlebarsRouter = express.Router(); 

handlebarsRouter.get('/', (req, res) => {
    res.render('index');
});

handlebarsRouter.get('/info', (req, res) => {
  res.render('info');
});

handlebarsRouter.get('/showtimes', (req, res) => {
  res.render('showtimes')
});

handlebarsRouter.get('/data', getAllMovies, async (req, res) => {
  try {
    res.render('data', {
      movies: res.allMovies
    });
  } catch (err) {
    console.log(err);
  }
});

export default handlebarsRouter;