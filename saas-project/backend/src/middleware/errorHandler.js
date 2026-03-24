import { ApiError } from '../utils/errors.js';

export function notFoundHandler(_req, _res, next) {
  next(new ApiError(404, 'Route not found'));
}

export function errorHandler(err, _req, res, _next) {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Unexpected server error';

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message
  });
}
