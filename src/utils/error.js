const httpStatus = require('http-status');
const logger = require('./logger');

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    this.stack = stack;
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  if (!err.isOperational) {
    logger.error(err);
  }
  res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

const converter = (err, req, res, next) => {
  let error = err;
  if (!(err instanceof ApiError)) {
    // unexpected error, log error
    const status = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[status];
    const stack = err.stack || '';
    error = new ApiError(status, message, false, stack);
  }
  next(error);
};

const notFound = (req, res, next) => {
  const err = new ApiError(httpStatus.NOT_FOUND, 'Not found');
  next(err);
};

module.exports = {
  ApiError,
  errorHandler,
  notFound,
  converter,
};
