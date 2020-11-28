import express from 'express';

import { getMovie, getAllMovies } from '../middleware/movie.js';
import { getAllTheaters } from '../middleware/theater.js';

const handlebarsRouter = express.Router();

handlebarsRouter.get('/', getAllMovies, async (req, res) => {
  res.render('home', {
    style: 'home',
    movies: await res.allMovies,
  });
});

handlebarsRouter.get('/info/:id', getMovie, async (req, res) => {
  res.render('info', {
    style: 'info',
    movie: await res.movie,
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

handlebarsRouter.get('/theaters', getAllTheaters, (req, res) => {
  res.render('theaters', {
    style: 'theaters',
    theaters: res.allTheaters,
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

handlebarsRouter.get('/allTheaters', getAllTheaters, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/selectShowtime', {
    theaters: res.allTheaters,
  });
});

handlebarsRouter.get('/sample/showtimes', (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/sampleData/selectShowtime');
});

export default handlebarsRouter;
