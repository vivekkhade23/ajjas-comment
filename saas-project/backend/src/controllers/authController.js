import { User } from '../models/User.js';
import { Tenant } from '../models/Tenant.js';
import { ApiError } from '../utils/errors.js';
import { signToken } from '../utils/jwt.js';

export async function register(req, res, next) {
  try {
    const { name, email, password, tenantName } = req.body;

    if (!name || !email || !password || !tenantName) {
      throw new ApiError(400, 'name, email, password and tenantName are required');
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) throw new ApiError(409, 'Email already exists');

    const tenant = await Tenant.create({ name: tenantName, plan: 'free', status: 'active' });

    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
      tenantId: tenant._id,
      tenants: [{ tenantId: tenant._id, role: 'admin' }]
    });

    const token = signToken({ sub: user._id, role: user.role });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenants: user.tenants
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = signToken({ sub: user._id, role: user.role });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        tenants: user.tenants
      }
    });
  } catch (error) {
    next(error);
  }
}
