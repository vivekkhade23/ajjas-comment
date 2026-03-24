import { Router } from 'express';
import { createSubscription, razorpayWebhook } from '../controllers/billingController.js';
import { requireRole } from '../middleware/roles.js';

const router = Router();

router.post('/subscriptions', requireRole('superadmin', 'admin'), createSubscription);
router.post('/webhook', razorpayWebhook);

export default router;
