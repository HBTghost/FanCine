import express from 'express';

import { getMovie, getAllMovies, getMoviesByTheaterID } from '../middleware/movie.js';
import { getAllTheaters, getTheatersByMovieID } from '../middleware/theater.js';
import {
  getTheaterMoviesByMovieID,
  getTheaterMoviesByTheaterID,
  getTheaterMovieRecursively,
} from '../middleware/theaterMovie.js';
import { getDateShowsFromTheaterMovieID } from '../middleware/dateShow.js';
import { getShowTimeByOtherKey } from '../middleware/showTime.js';

const handlebarsRouter = express.Router();

handlebarsRouter.get('/', getAllMovies, async (req, res) => {
  res.render('home', {
    style: 'home',
    movies: await res.allMovies,
  });
});

handlebarsRouter.get('/info/:id', getMovie, (req, res) => {
  res.render('info', {
    style: 'info',
    movie: res.movie,
  });
});

handlebarsRouter.get('/movie-on-show', getAllMovies, async (req, res) => {
  res.render('movieLiveList', {
    style: 'movie-on-show',
    movies: await res.allMovies,
  });
});

handlebarsRouter.get('/review', (req, res) => {
  res.render('review', {
    style: 'review',
  });
});

handlebarsRouter.get('/review/reviewContentSample', (req, res) => {
  res.render('partials/reviewContentSample', {
    style: 'reviewContent',
  });
});

handlebarsRouter.get('/info', (req, res) => {
  res.render('info', {
    style: 'info',
  });
});

handlebarsRouter.get('/book-ticket', (req, res) => {
  res.render('book-ticket', {
    style: 'book-ticket',
  });
});
handlebarsRouter.get(
  '/book-ticket/:_idTheaterMovie/:_idDateShow/:_idTypeShow/:time/',
  getShowTimeByOtherKey,
  (req, res) => {
    // res.render('book-ticket', {
    //   style: 'book-ticket',
    // });
    res.redirect(`/book-ticket/${res.showTime._id}`);
  },
);
handlebarsRouter.get('/book-ticket', (req, res) => {
  res.render('book-ticket', {
    style: 'book-ticket',
  });
});

handlebarsRouter.get('/book-ticket/:id', (req, res) => {
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

handlebarsRouter.get('/data', getAllMovies, (req, res) => {
  try {
    res.render('data', {
      movies: res.allMovies,
    });
  } catch (err) {
    console.log(err);
  }
});

// Showtimes
handlebarsRouter.get('/showtimes', async (req, res) => {
  res.render('showtimes', {
    style: 'showtimes',
    script: 'showtimes',
  });
});

handlebarsRouter.get('/showtimes/allMovies', getAllMovies, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/showtimes/movies', {
    movies: res.allMovies,
  });
});

handlebarsRouter.get('/showtimes/allMovies/:id', getTheaterMoviesByTheaterID, getMoviesByTheaterID, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/showtimes/movies', {
    movies: res.movies,
  });
});

handlebarsRouter.get('/showtimes/allTheaters', getAllTheaters, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/showtimes/theaters', {
    theaters: res.allTheaters,
  });
});

handlebarsRouter.get('/showtimes/allTheaters/:id', getTheaterMoviesByMovieID, getTheatersByMovieID, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/showtimes/theaters', {
    theaters: res.theaters,
  });
});

handlebarsRouter.get('/showtimes/sampleData', (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/sampleData/selectShowtime');
});

handlebarsRouter.get('/feature/getShowtimesByTheaterMovie/:id', getDateShowsFromTheaterMovieID, (req, res) => {
  res.status(200);
  res.json(res.dateShows);
});

handlebarsRouter.get('/showtimes/allShowTimes/:id', getTheaterMovieRecursively, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/showtimes/showtimes', {
    theaterMovieRecursively: res.theaterMovie,
  });
});

// Member
handlebarsRouter.all('/member', (req, res) => {
  res.render('member', {
    style: 'member',
    userInfo: {
      fullName: 'Đinh Trần Văn Anh',
      phoneNumber: '0123456789',
      birthdate: '2000-01-25',
      address: '235 Nguyễn Văn Cừ',
      star: 10,
      expense: 1255000,
      email: 'dinhtranvana2000@gmail.com',
      curYear: '2020',
    },
  });
});

export default handlebarsRouter;
