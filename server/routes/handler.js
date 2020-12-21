import express from 'express';
import {
  ensureAuthenticated,
  ensureAuthenticatedOrRedirect,
  ensureAdmin,
} from '../config/checkAuth.js';
import {
  getMovie,
  getMovieBySession,
  getMoviesFromSessions,
  getMovieFromTheaterMovie,
  getAllMovies,
  getMoviesByTheaterID,
  getMoviesByKeyword,
} from '../middleware/movie.js';
import {
  getTheaterBySession,
  getTheaterFromTheaterMovie,
  getAllTheaters,
  getTheatersByMovieID,
} from '../middleware/theater.js';
import {
  getTheaterMovieFromShowtime,
  getTheaterMovieBySession,
  getTheaterMoviesFromSessions,
  getTheaterMoviesByMovieID,
  getTheaterMoviesByTheaterID,
  getTheaterMovieRecursively,
} from '../middleware/theaterMovie.js';
import {
  getDateShowBySession,
  getDateShowsFromTheaterMovieID,
  getDateShowFromShowtime,
} from '../middleware/dateShow.js';
import { getTypeShowBySession, getTypeShowFromShowtime } from '../middleware/typeShow.js';
import { getAllUsers } from '../middleware/user.js';
import {
  getShowTime,
  getShowtimeBySession,
  getShowTimeByOtherKey,
  getShowtimesBySessions,
} from '../middleware/showTime.js';
import { getAllProvinces, getAllDistrict } from '../middleware/provinces.js';
import { toBirthDate } from '../helpers/date.js';
import { Movie } from '../models/index.js';
import updateUserInfor from '../middleware/updateInfor.js';
import { getSessionByID, getFilteredSessionsFromUser } from '../middleware/session.js';

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
    script: 'info',
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

handlebarsRouter.all('/book-ticket/checkAuth', ensureAuthenticated);
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

handlebarsRouter.all('/book-ticket/:id/checkAuth', ensureAuthenticated);

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

    const rowLabels = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    const seats = {
      state: res.showTime.state,
      rowNum: res.showTime.state.length,
      colNum: res.showTime.state[0].length,
    };

    let availableTicketsNum = 0;
    for (let i = 0; i < seats.rowNum; ++i) {
      for (let j = 0; j < seats.colNum; ++j) {
        if (!seats.state[i][j]) {
          availableTicketsNum += 1;
        }
      }
    }

    const auditorium = {
      rowSeatLabels: rowLabels.slice(0, seats.rowNum),
      seatStates: seats.state.map((row, i) => ({ label: rowLabels[i], row })),
    };

    res.render('book-ticket', {
      style: 'book-ticket',
      script: 'book-ticket',
      showtime: {
        availableTicketsNum,
        tickets,
        combos,
        auditorium,
        info: {
          image: res.movie.horizontalImageSource,
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
        user: {
          fullName: req.user.name,
          phoneNumber: req.user.phone,
          email: req.user.email,
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

handlebarsRouter.post('/getProvinces', getAllProvinces, async (req, res) => {
  res.json(await res.fullProvinces);
});

handlebarsRouter.post('/getProvince/:provinceID/District', getAllDistrict, async (req, res) => {
  res.json(await res.districts);
});

handlebarsRouter.get('/search', getMoviesByKeyword, async (req, res) => {
  res.render('searchResult', {
    style: 'review',
    result: await res.result,
    searchQuery: req.query.q,
    pageArray: await res.pageArray,
    pagePrevious: await res.pagePrevious,
    pageCurrent: await res.pageCurrent,
    pageNext: await res.pageNext,
  });
  // res.json(await res.result);
});

// Member
handlebarsRouter.get('/member', (req, res) => {
  res.redirect('/member/info');
});

handlebarsRouter.get('/member/info', ensureAuthenticatedOrRedirect, (req, res) => {
  res.render('member', {
    style: 'member',
    script: 'member',
    activeTab: 0,
    userInfo: {
      fullName: req.user.name,
      phoneNumber: req.user.phone,
      birthdate: toBirthDate(req.user.DoB),
      sex: req.user.sex,
      address: req.user.address,
      star: req.user.point,
      expense: req.user.spending,
      email: req.user.email,
      city: req.user.city,
      town: req.user.town,
      curYear: new Date().getFullYear(),
    },
  });
});

handlebarsRouter.post(
  '/member/info/update',
  ensureAuthenticatedOrRedirect,
  updateUserInfor,
  (req, res) => {
    res.redirect('/member/info');
  },
);

handlebarsRouter.all(
  '/member/transaction-history',
  ensureAuthenticatedOrRedirect,
  getFilteredSessionsFromUser,
  getShowtimesBySessions,
  getTheaterMoviesFromSessions,
  getMoviesFromSessions,
  (req, res) => {
    res.render('member', {
      style: 'member',
      script: 'member',
      activeTab: 1,
      sessions: res.sessions,
      filterForm: res.filterForm,
    });
  },
);

handlebarsRouter.get(
  '/member/transaction-history/:id',
  ensureAuthenticatedOrRedirect,
  getSessionByID,
  getShowtimeBySession,
  getTheaterMovieBySession,
  getTheaterBySession,
  getMovieBySession,
  getDateShowBySession,
  getTypeShowBySession,
  (req, res) => {
    res.render('detailed-transaction', {
      style: 'detailed-transaction',
      script: 'detailed-transaction',
      session: res.session,
    });
  },
);

// Promotion
handlebarsRouter.get('/promotion', (req, res) => {
  res.render('promotion-detail.hbs', {
    style: 'promotion-detail',
    script: 'info',
  });
});

handlebarsRouter.all('/member/checkAuth', ensureAuthenticated);

handlebarsRouter.get(
  '/admin',
  ensureAdmin,
  getAllUsers,
  getAllMovies,
  getAllTheaters,
  (req, res) => {
    res.render('admin', {
      layout: 'admin',
      page: 'home',
      userQuantity: res.allUsers.length,
      movieQuantity: res.allMovies.length,
      theaterQuantity: res.allTheaters.length,
    });
  },
);

handlebarsRouter.get('/admin/postMovie', ensureAdmin, (req, res) => {
  res.render('postMovie', {
    layout: 'admin',
    labels: Movie.schema.path('label').enumValues,
    style: 'postMovie',
    script: 'postMovie',
    page: 'movie',
    show: true,
    menuItem: 'postMovie',
  });
});

handlebarsRouter.get('/admin/manageMovie', ensureAdmin, getAllMovies, (req, res) => {
  res.render('manageMovie', {
    movies: res.allMovies,
    layout: 'admin',
    style: 'manageMovie',
    script: 'manageMovie',
    page: 'movie',
    show: true,
    menuItem: 'manageMovie',
  });
});

handlebarsRouter.get('/admin/manageUser', ensureAdmin, getAllUsers, (req, res) => {
  res.render('manageUser', {
    users: res.allUsers,
    style: 'manageMovie',
    script: 'manageUser',
    layout: 'admin',
    page: 'user',
  });
});

handlebarsRouter.get('/updatePassword', ensureAuthenticatedOrRedirect, (req, res) => {
  res.render('updatePassword', {
    layout: 'authRender',
  });
});
handlebarsRouter.get('/updatePassword/checkAuth', ensureAuthenticated);

handlebarsRouter.get('/hoangTest', (req, res) => {
  res.render('empty_garbage');
});

export default handlebarsRouter;
