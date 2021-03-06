import express from 'express';
import { getAllMovies, updateMovieInfor } from '../middleware/movie.js';
import { getAllTheaters, updateTheaterInfor } from '../middleware/theater.js';
import { getAllSessions } from '../middleware/session.js';
import { getAllUsers, getAllUsersBySorting } from '../middleware/user.js';

import { Movie } from '../models/index.js';

import { c, arr } from '../../public/njs/pages/provinces.js';

import ImageMiddleware from '../middleware/image.js';
import {
  getReview,
  getAllReview,
  getAllReviewNoContent,
  deletedByFlagReviewID,
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

adminRouter.get('/manageReview', getAllReviewNoContent, async (req, res) => {
  res.render('mangeReview', {
    // movies: res.allMovies,
    layout: 'admin',
    style: 'manageMovie',
    script: 'manageReview',
    page: 'review',
    showReview: true,
    menuItem: 'manageReview',

    review: res.allReviews,
  });
});

adminRouter.get('/manageReview/delete/:id', deletedByFlagReviewID, async (req, res) => {
  res.status(200).json({ message: 'successfull' });
});

adminRouter.post('/manageMovie/update', updateMovieInfor, (req, res) => {
  res.redirect('/admin/manageMovie');
});

// ===== Manage theaters =====
adminRouter.get('/postTheater', (req, res) => {
  res.render('postTheater', {
    layout: 'admin',
    style: 'postMovie',
    script: 'postTheater',
    page: 'theater',
    show: false,
    menuItem: 'postTheater',
  });
});

adminRouter.get('/manageTheater', getAllTheaters, (req, res) => {
  res.render('manageTheater', {
    theaters: res.allTheaters,
    layout: 'admin',
    style: 'manageTheater',
    script: 'manageTheater',
    page: 'theater',
    show: false,
    menuItem: 'manageTheater',
  });
});

adminRouter.post('/manageTheater/update', updateTheaterInfor, (req, res) => {
  res.redirect('/admin/manageTheater');
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

adminRouter.get('/manageTicket', getAllSessions, (req, res) => {
  res.render('manageTicket', {
    allSessions: res.allSessions,
    layout: 'admin',
    page: 'home',
    style: 'manageTicket',
    script: 'manageTicket',
  });
});

export default adminRouter;
