import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import { File } from 'file-api';
import mongoose from 'mongoose';
import { Movie } from '../models/index.js';
import {
  getMovie,
  getAllMovies,
  createMovieByForm,
  postSampleMovies,
} from '../middleware/movie.js';

const movieRouter = express.Router();

movieRouter.get('/:id', getMovie, (req, res) => {
  res.json(res.movie);
});

movieRouter.get('/', getAllMovies, (req, res) => {
  res.json(res.allMovies);
});

movieRouter.post('/', async (req, res) => {
  const img = req.files.horizontalImage2;
  const file = new File({
    name: img.name,
    type: img.mimetype,
    buffer: Buffer.from(img.data, 'hex').toString(),
  });

  const formData = new FormData();
  formData.smfile = file;
  formData.ssl = true;

  await axios
    .post('https://sm.ms/api/v2/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'XBIMYfKCfBIyCMxLeACvEYEDvdyVuQuT',
        'User-Agent': 'Mozilla/5.0',
      },
    })
    .then((response) => console.log(response.data))
    .catch(() => console.error('Failure'));

  res.send('Done');
});

movieRouter.post('/simple', createMovieByForm, (req, res) => {
  res.redirect('/manage');
});

movieRouter.post('/utils/postSampleDatasets', postSampleMovies, (req, res) => {
  res.json(res.movies);
});

movieRouter.delete('/:id', async (req, res) => {
  try {
    await Movie.findById(mongoose.Types.ObjectId(req.params.id));
    // await Movie.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));
  } catch (err) {
    res.status(500).json(err);
  }
});

export default movieRouter;
