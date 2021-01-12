import express from 'express';
import mongoose from 'mongoose';
import { Review } from '../models/index.js';
import { ensureAdminApi } from '../config/checkAuth.js';
import { getReview, getAllReview, createReviewByForm } from '../middleware/review.js';
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

reviewRouter.post('/uploadImage', ImageMiddleware.upload, async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  // console.log(res);
  // console.log(req.uploadUrl.upload);
  res.status(200).json({
    'uploaded': true,
    'url': req.uploadUrl.upload,
  });
});

export default reviewRouter;
