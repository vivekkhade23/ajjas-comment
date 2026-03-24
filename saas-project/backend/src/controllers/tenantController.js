import { Tenant } from '../models/Tenant.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/errors.js';

export async function listTenants(req, res, next) {
  try {
    const tenantIds = req.user.tenants.map((t) => t.tenantId);
    const tenants = await Tenant.find({ _id: { $in: tenantIds } }).sort({ createdAt: -1 });
    res.json({ success: true, data: tenants });
  } catch (error) {
    next(error);
  }
}

export async function createTenant(req, res, next) {
  try {
    const { name, plan } = req.body;
    const tenant = await Tenant.create({ name, plan: plan || 'free', status: 'active' });

    req.user.tenants.push({ tenantId: tenant._id, role: 'admin' });
    await req.user.save();

    res.status(201).json({ success: true, data: tenant });
  } catch (error) {
    next(error);
  }
}

export async function inviteStaff(req, res, next) {
  try {
    const { name, email, password, role = 'staff' } = req.body;

    if (!['admin', 'staff'].includes(role)) {
      throw new ApiError(400, 'role must be admin or staff');
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) throw new ApiError(409, 'User with this email already exists');

    const user = await User.create({
      name,
      email,
      password,
      role,
      tenantId: req.tenantId,
      tenants: [{ tenantId: req.tenantId, role }]
    });

    res.status(201).json({ success: true, data: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
}

export async function listStaff(req, res, next) {
  try {
    const staff = await User.find({ 'tenants.tenantId': req.tenantId }).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
}
