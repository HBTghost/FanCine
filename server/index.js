import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';

import movieRouter from './routes/movie.js';
import theaterRouter from './routes/theater.js';
import theaterMovieRouter from './routes/theater_movie.js';
import showTimeRouter from './routes/showTime.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

// Create Express app
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.static('./dist'));

// API services
app.use('/api/movies', movieRouter);
app.use('/api/theaters', theaterRouter);
app.use('/api/theaters_movies', theaterMovieRouter);
app.use('/api/showTimes', showTimeRouter);

// Load homepage
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));;
});

// Listening
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});