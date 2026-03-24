import { ApiError } from '../utils/errors.js';

export function enforceTenantAccess(req, _res, next) {
  const tenantId = req.tenantId;
  const memberships = req.user?.tenants?.map((item) => String(item.tenantId)) || [];

  if (!memberships.includes(String(tenantId))) {
    return next(new ApiError(403, 'User is not authorized for this tenant'));
  }

  next();
}
