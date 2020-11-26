import express from 'express';

import { getAllMovies } from '../middleware/movie.js';

const handlebarsRouter = express.Router(); 

handlebarsRouter.get('/', (req, res) => {
    res.render('home', {
      style: 'home.css'
    });
});

handlebarsRouter.get('/info', (req, res) => {
  res.render('info', {
    style: 'info.css'
  });
});

handlebarsRouter.get('/showtimes', (req, res) => {
  res.render('showtimes', {
    style: 'showtimes.css'
  });
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
