import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/errors.js';
import { User } from '../models/User.js';

export async function requireAuth(req, _res, next) {
  try {
    const header = req.header('authorization');
    const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;

    if (!token) {
      return next(new ApiError(401, 'Missing access token'));
    }

    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).select('-password');

    if (!user) {
      return next(new ApiError(401, 'Invalid authentication context'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Unauthorized'));
  }
}
