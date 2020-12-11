import express from 'express';
import { ensureAuthenticated, ensureAuthenticatedOrRedirect } from '../config/checkAuth.js';
import {
  getMovie,
  getMovieFromTheaterMovie,
  getAllMovies,
  getMoviesByTheaterID,
} from '../middleware/movie.js';
import {
  getTheaterFromTheaterMovie,
  getAllTheaters,
  getTheatersByMovieID,
} from '../middleware/theater.js';
import {
  getTheaterMovieFromShowtime,
  getTheaterMoviesByMovieID,
  getTheaterMoviesByTheaterID,
  getTheaterMovieRecursively,
} from '../middleware/theaterMovie.js';
import { getDateShowsFromTheaterMovieID, getDateShowFromShowtime } from '../middleware/dateShow.js';
import { getTypeShowFromShowtime } from '../middleware/typeShow.js';
import { getShowTime, getShowTimeByOtherKey } from '../middleware/showTime.js';

import { toBirthDate } from '../helpers/date.js';

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

handlebarsRouter.get('/book-ticket', ensureAuthenticatedOrRedirect, (req, res) => {
  res.render('book-ticket', {
    style: 'book-ticket',
  });
});
handlebarsRouter.get(
  '/book-ticket/:_idTheaterMovie/:_idDateShow/:_idTypeShow/:time/',
  ensureAuthenticatedOrRedirect,
  getShowTimeByOtherKey,
  (req, res) => {
    res.redirect(`/book-ticket/${res.showTime._id}`);
  },
);
handlebarsRouter.get('/book-ticket', (req, res) => {
  res.render('book-ticket', {
    style: 'book-ticket',
  });
});

handlebarsRouter.get(
  '/book-ticket/:id',
  ensureAuthenticatedOrRedirect,
  getShowTime,
  getTheaterMovieFromShowtime,
  getTheaterFromTheaterMovie,
  getMovieFromTheaterMovie,
  getDateShowFromShowtime,
  getTypeShowFromShowtime,
  (req, res) => {
    const labelDescriptions = {
      'P': 'Không giới hạn độ tuổi',
      'C13': 'Phim chỉ dành cho khán giả từ 13 tuổi trở lên',
      'C16': 'Phim chỉ dành cho khán giả từ 16 tuổi trở lên',
      'C18': 'Phim chỉ dành cho khán giả từ 18 tuổi trở lên',
    };

    const tickets = [
      {
        name: 'Phổ thông',
        description: 'Dành cho mọi đối tượng.',
        unitPrice: 80000,
      },
      {
        name: 'Học sinh/Sinh viên',
        description: 'Chỉ dành cho học sinh và sinh viên.',
        unitPrice: 75000,
      },
      {
        name: 'VIP',
        description: 'Chỉ dành cho thành viên VIP.',
        unitPrice: 70000,
      },
    ];

    const combos = [
      {
        image: 'https://www.galaxycine.vn/media/2020/5/19/combo-1_1589871759174.jpg',
        name: 'Combo 1 Large',
        description: '1 Bắp + 1 Nước ngọt 32 Oz',
        unitPrice: 72000,
      },
      {
        image: 'https://www.galaxycine.vn/media/2020/5/19/combo-2_1589871763789.jpg',
        name: 'Combo 2 Small',
        description: '1 Bắp + 2 Nước ngọt 22 Oz',
        unitPrice: 81000,
      },
    ];

    let availableTicketsNum = 0;
    for (let i = 0; i < res.showTime.state.length; ++i) {
      for (let j = 0; j < res.showTime.state[0].length; ++j) {
        if (!res.showTime.state[i][j]) {
          availableTicketsNum += 1;
        }
      }
    }

    res.render('book-ticket', {
      style: 'book-ticket',
      script: 'book-ticket',
      showtime: {
        availableTicketsNum,
        tickets,
        combos,
        info: {
          image: res.movie.imageSource,
          oriName: res.movie.originalName,
          vieName: res.movie.vietnameseName,
          theaterName: res.theater.name,
          roomName: res.showTime.room,
          time: res.showTime.time,
          date: res.dateShow.value,
          label: {
            value: res.movie.label,
            description: labelDescriptions[res.movie.label],
          },
          type: res.typeShow.value,
        },
      },
    });
  },
);

handlebarsRouter.get('/theaters', getAllTheaters, (req, res) => {
  res.render('theaters', {
    style: 'theaters',
    theaters: res.allTheaters,
  });
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

handlebarsRouter.get(
  '/showtimes/allMovies/:id',
  getTheaterMoviesByTheaterID,
  getMoviesByTheaterID,
  (req, res) => {
    res.status(200);
    res.header('Content-Type', 'text/html');
    res.render('partials/renderStructure/showtimes/movies', {
      movies: res.movies,
    });
  },
);

handlebarsRouter.get('/showtimes/allTheaters', getAllTheaters, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/showtimes/theaters', {
    theaters: res.allTheaters,
  });
});

handlebarsRouter.get(
  '/showtimes/allTheaters/:id',
  getTheaterMoviesByMovieID,
  getTheatersByMovieID,
  (req, res) => {
    res.status(200);
    res.header('Content-Type', 'text/html');
    res.render('partials/renderStructure/showtimes/theaters', {
      theaters: res.theaters,
    });
  },
);

handlebarsRouter.get('/showtimes/sampleData', (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/sampleData/selectShowtime');
});

handlebarsRouter.get(
  '/feature/getShowtimesByTheaterMovie/:id',
  getDateShowsFromTheaterMovieID,
  (req, res) => {
    res.status(200);
    res.json(res.dateShows);
  },
);

handlebarsRouter.get('/showtimes/allShowTimes/:id', getTheaterMovieRecursively, (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('partials/renderStructure/showtimes/showtimes', {
    theaterMovieRecursively: res.theaterMovie,
  });
});

handlebarsRouter.get('/render/header', (req, res) => {
  res.status(200);
  res.header('Content-Type', 'text/html');
  res.render('empty');
});

handlebarsRouter.get('/isLogin', (req, res) => {
  res.send(req.isAuthenticated());
});

// Member
handlebarsRouter.all('/member', ensureAuthenticatedOrRedirect, (req, res) => {
  res.render('member', {
    style: 'member',
    userInfo: {
      fullName: req.user.name,
      phoneNumber: req.user.phone,
      birthdate: toBirthDate(req.user.DoB),
      sex: req.user.sex,
      address: req.user.address,
      star: req.user.point,
      expense: req.user.spending,
      email: req.user.email,
      curYear: '2020',
    },
  });
});

handlebarsRouter.all('/member/checkAuth', ensureAuthenticated);

export default handlebarsRouter;
