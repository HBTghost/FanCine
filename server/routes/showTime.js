import express from 'express';
import { getShowTime, getAllShowTimes, postSampleShowTimes } from '../middleware/showTime.js';

const showTimeRouter = express.Router();

showTimeRouter.get('/:id', getShowTime, (req, res) => {
  res.json(res.showTime);
});

showTimeRouter.get('/', getAllShowTimes, (req, res) => {
  res.json(res.allShowTimes);
});

showTimeRouter.post('/utils/postSampleDatasets', postSampleShowTimes, (req, res) => {
  res.send('Done');
});

export default showTimeRouter;
