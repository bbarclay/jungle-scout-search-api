import winston from 'winston';

// eslint-disable-next-line import/prefer-default-export
export default (error, req, res, next) => {
  winston.error(error.errorType || 'Unknown Express Error', {
    error: error.message,
    url: req.url,
    stack: error.stack,
    status: `${error.statusCode || 500}`,
    name: error.name,
    errorType: error.errorType || 'UnknownError',
  });

  res.status(error.statusCode || 500).json({
    errors: [{
      title: error.errorType || 'UnknownError',
      detail: error.message || error.detail,
      status: `${error.statusCode || 500}`,
    }],
  });
  next();
};
