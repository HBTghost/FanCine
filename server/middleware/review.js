import mongoose from 'mongoose';
import { Review } from '../models/index.js';

async function getReview(req, res, next) {
  try {
    res.review = await Review.findById(mongoose.Types.ObjectId(req.params.id)).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllReview(req, res, next) {
  try {
    res.allReviews = await Review.find().lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getLimitedReview(req, res, next) {
  try {
    const limitReview = 6;
    res.allReviews = await Review.find().limit(limitReview).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function createReviewByForm(req, res, next) {
  try {
    const data = req.body;
    const review = new Review({
      originalName: data.review_head_originalName,
      vietnameseName: data.review_head_vietnameseName,
      imageSource: req.uploadUrl.verticalImage,
      author: data.review_author,
      title: data.review_title,
      content: data.review_content,
      flag: 'normal',
    });

    review.createAt = Date.now();
    review.createdAtMili = review.createdAt.getTime();
    await review.save();
    res._id = String(review._id);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export { getReview, getAllReview, getLimitedReview, createReviewByForm };
