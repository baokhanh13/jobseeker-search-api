const express = require('express');
const morgan = require('morgan');
const controller = require('./utils/controller');
const {
  converter,
  notFound,
  errorHandler,
  ApiError,
} = require('./utils/error');

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (req, res) => res.json({ msg: 'ok' }));

app.use(converter);
app.use(notFound);

app.use((err, req, res, next) => errorHandler(err, req, res, next));

module.exports = app;
