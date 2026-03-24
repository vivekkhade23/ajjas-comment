import { Router } from 'express';
import { createTenant, inviteStaff, listStaff, listTenants } from '../controllers/tenantController.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.get('/', listTenants);
router.post('/', requireRole('superadmin', 'admin'), createTenant);
router.get('/staff', requireRole('superadmin', 'admin'), listStaff);
router.post('/staff', requireRole('superadmin', 'admin'), inviteStaff);

export default router;
