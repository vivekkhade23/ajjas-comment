import { ApiError } from '../utils/errors.js';

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden: role mismatch'));
    }

    next();
  };
}
