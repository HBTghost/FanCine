import express from 'express';
import { getAllMovies } from '../middleware/movie.js';
import { getAllTheaters } from '../middleware/theater.js';
import { getAllSessions } from '../middleware/session.js';
import { getAllUsers, getAllUsersBySorting } from '../middleware/user.js';

import { Movie } from '../models/index.js';

import { c, arr } from '../../public/njs/pages/provinces.js';

import ImageMiddleware from '../middleware/image.js';
import {
  getReview,
  getAllReview,
  createReviewByForm,
} from '../middleware/review.js';

const adminRouter = express.Router();

adminRouter.get('/', getAllUsers, getAllMovies, getAllTheaters, getAllSessions, (req, res) => {
  res.render('admin', {
    layout: 'admin',
    page: 'home',
    userQuantity: res.allUsers.length,
    userHistogram: res.userHistogram,
    movieQuantity: res.allMovies.length,
    movieHistogram: res.movieHistogram,
    movieLabels: res.movieLabels,
    theaterQuantity: res.allTheaters.length,
    sessionQuantity: res.allSessions.length,
    sessionHistogram: res.sessionHistogram,
    profit: res.profit,
    revenueHistogram: res.revenueHistogram,
  });
});

adminRouter.get('/postMovie', (req, res) => {
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

adminRouter.get('/manageMovie', getAllMovies, (req, res) => {
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

// ===== Review =====
adminRouter.get('/postReview', (req, res) => {
  res.render('postReview', {
    layout: 'admin',
    style: 'postMovie',
    script: 'postMovie',
    page: 'review',
    showReview: true,
    menuItem: 'postReview',
  });
});

// adminRouter.post(
//   '/postReview/uploadReview',
//   ImageMiddleware.upload,
//   createReviewByForm,
//   async (req, res) => {
//     res.redirect(`/review/${res._id}`);
//   },
// );

adminRouter.get('/manageReview', (req, res) => {
  res.render('manageMovie', {
    // movies: res.allMovies,
    layout: 'admin',
    style: 'manageMovie',
    script: 'manageMovie',
    page: 'review',
    showReview: true,
    menuItem: 'manageReview',
  });
});

// ===== Manage users =====
function standardizeUsers(users) {
  users.forEach((user) => {
    // Date of birth
    let d = user.DoB.getDate();
    let m = user.DoB.getMonth() + 1;
    const y = user.DoB.getFullYear();
    d = d < 10 ? `0${d}` : `${d}`;
    m = m < 10 ? `0${m}` : `${m}`;
    user.DoB = `${d}/${m}/${y}`;

    // City & Area
    user.cityName = c[parseInt(user.city, 10)];
    user.townName = arr[parseInt(user.city, 10)][parseInt(user.town, 10)];
  });
}

adminRouter.get(
  '/manageUser/sort/:colIndex/:sortType',

  getAllUsersBySorting,
  (req, res) => {
    standardizeUsers(res.allUsers);
    res.status(200);
    res.header('Content-Type', 'text/html');
    res.render('partials/renderStructure/admin/manageUser', {
      users: res.allUsers,
    });
  },
);

adminRouter.get('/manageUser', getAllUsers, (req, res) => {
  standardizeUsers(res.allUsers);
  res.render('manageUser', {
    users: res.allUsers,
    style: 'manageUser',
    script: 'manageUser',
    layout: 'admin',
    page: 'user',
  });
});

adminRouter.get(
  '/manageTicket',
  getAllUsers,
  getAllMovies,
  getAllTheaters,
  getAllSessions,
  (req, res) => {
    res.render('manageTicket', {
      layout: 'admin',
      page: 'home',
      userQuantity: res.allUsers.length,
      userHistogram: res.userHistogram,
      movieQuantity: res.allMovies.length,
      movieHistogram: res.movieHistogram,
      movieLabels: res.movieLabels,
      theaterQuantity: res.allTheaters.length,
      sessionQuantity: res.allSessions.length,
      sessionHistogram: res.sessionHistogram,
    });
  },
);

export default adminRouter;
