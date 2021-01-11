import express from 'express';
import mongoose from 'mongoose';
import { Review } from '../models/index.js';
import { ensureAdminApi } from '../config/checkAuth.js';
import {
  getReview,
  getAllReview,
  createReviewByForm,
} from '../middleware/review.js';
import ImageMiddleware from '../middleware/image.js';

const reviewRouter = express.Router();

reviewRouter.post(
  '/',
  ensureAdminApi,
  ImageMiddleware.upload,
  createReviewByForm,
  async (req, res) => {
    res.redirect(`/review/${res._id}`);
  },
);

export default reviewRouter;
