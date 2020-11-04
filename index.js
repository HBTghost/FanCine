const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.json('Hello');
});

app.listen(port);