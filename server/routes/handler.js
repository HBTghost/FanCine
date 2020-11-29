import express from 'express';

import { getMovie, getAllMovies } from '../middleware/movie.js';

const handlebarsRouter = express.Router();

handlebarsRouter.get('/', (req, res) => {
  res.render('home', {
    style: 'home',
  });
});

handlebarsRouter.get('/info/:id', getMovie, async (req, res) => {
  res.render('info', {
    style: 'info',
    movie: await res.movie,
  });
});

handlebarsRouter.get('/review', (req, res) => {
  res.render('partials/reviewContentSample', {
    style: 'reviewContent',
  });
});

handlebarsRouter.get('/info', (req, res) => {
  res.render('info', {
    style: 'info',
  });
});

handlebarsRouter.get('/showtimes', getAllMovies, async (req, res) => {
  res.render('showtimes', {
    style: 'showtimes',
    script: 'showtimes',
    movies: await res.allMovies,
  });
});

handlebarsRouter.get('/book-ticket', (req, res) => {
  res.render('book-ticket', {
    style: 'book-ticket',
  });
});

handlebarsRouter.get('/data', getAllMovies, async (req, res) => {
  try {
    res.render('data', {
      movies: await res.allMovies,
    });
  } catch (err) {
    console.log(err);
  }
});

export default handlebarsRouter;
