import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path, { dirname } from 'path';
import expbs from 'express-handlebars';

import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';

import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import configPassport from './server/config/passport.js';
import HandlebarsHelper from './server/helpers/handlebars.js';

import { ensureAdmin } from './server/config/checkAuth.js';

import {
  handlebarsRouter,
  movieRouter,
  theaterRouter,
  theaterMovieRouter,
  showTimeRouter,
  swaggerRouter,
  sessionRouter,
  userRouter,
  reviewRouter,
} from './server/routes/index.js';

import authRouter from './server/routes/auth.js';
import renderAuthRouter from './server/routes/renderAuth.js';
import adminRouter from './server/routes/adminHandler.js';

configPassport(passport);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

// Create Express app
const app = express();
// Force https
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    return next();
  }
  return next();
});

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  fileUpload({
    createParentPath: true,
  }),
);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// ------------ Express session Configuration ------------//
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

// ------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

// ------------ Connecting flash ------------//
app.use(flash());

// ------------ Global variables ------------//
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.username = req.user ? req.user.name : undefined;
  next();
});

// Server rendering
app.use('/', handlebarsRouter);
// app.use('/admin', ensureAdmin, adminRouter);
app.use('/admin', adminRouter);

app.use('/', authRouter);
app.use('/render', renderAuthRouter);

// API services
app.use('/api/movies', movieRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/theaters_movies', theaterMovieRouter);
app.use('/api/showTimes', showTimeRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// swagger docs route
app.use('/api-docs', swaggerRouter);

const hbs = expbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/mainLayout'), // change layout folder name
  partialsDir: path.join(__dirname, 'views/partials'), // change partials folder name
  helpers: HandlebarsHelper,
});

// Express Handlebars Configuration
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Listening
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
