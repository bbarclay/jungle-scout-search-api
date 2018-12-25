import { HttpStatusError } from 'common-errors';

// eslint-disable-next-line import/prefer-default-export
export default (externalError, req, res, next) => {
  const error = new HttpStatusError(externalError, req);

  res.status(error.status_code).json({
    status: error.status_code,
    message: error.message,
  });
};
