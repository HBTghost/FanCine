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
    res.allReviews = await Review.find(
      { flag: { $ne: 'deleted' } },
    ).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getAllReviewNoContent(req, res, next) {
  try {
    res.allReviews = await Review.find(
      { flag: { $ne: 'deleted' } },
      { '_id': 1, 'originalName': 1, 'vietnameseName': 1, 'imageSource': 1, 'title': 1, 'author': 1, 'createdAtMili': 1, 'createdAt': 1 },
    ).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function getLimitedReview(req, res, next) {
  try {
    const limitReview = 6;
    res.allReviews = await Review.find(
      { flag: { $ne: 'deleted' } },
      { '_id': 1, 'originalName': 1, 'vietnameseName': 1, 'imageSource': 1, 'title': 1, 'createdAtMili': 1, 'createdAt': 1 },
      { limit: limitReview },
    ).lean();
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function deletedByFlagReviewID(req, res, next) {
  try {
    const filter = { _id: req.params.id };
    const update = { flag: 'deleted' };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    res.doc = await Review.findOneAndUpdate(filter, update, {
      new: true,
    });
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

export {
  getReview,
  getAllReview,
  getAllReviewNoContent,
  getLimitedReview,
  deletedByFlagReviewID,
  createReviewByForm,
};
