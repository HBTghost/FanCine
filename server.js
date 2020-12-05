import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path, { dirname } from 'path';
import expbs from 'express-handlebars';

import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import HandlebarsHelper from './server/helpers/handlebars.js';
import errorHandler from './server/middleware/error-handler.js';

import {
  handlebarsRouter,
  movieRouter,
  theaterRouter,
  theaterMovieRouter,
  showTimeRouter,
  accountRouter,
  swaggerRouter,
} from './server/routes/index.js';

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

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// Server rendering
app.use('/', handlebarsRouter);

// API services
app.use('/api/movies', movieRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/theaters_movies', theaterMovieRouter);
app.use('/api/showTimes', showTimeRouter);

app.use('/accounts', accountRouter);

// swagger docs route
app.use('/api-docs', swaggerRouter);

// global error handler
app.use(errorHandler);

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
