import { ApiError } from '../utils/errors.js';

export function tenantResolver(req, _res, next) {
  const tenantId = req.header('x-tenant-id');

  if (!tenantId) {
    return next(new ApiError(400, 'x-tenant-id header is required'));
  }

  req.tenantId = tenantId;
  next();
}
