const ticket = require('./routes/ticket.js');
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

const app = express();

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));;
});

app.get('/api/ticket', (req, res) => {
  res.json(ticket.movie);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});