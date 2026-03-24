import { Router } from 'express';
import { getAiInsights, getAnalytics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/', getAnalytics);
router.get('/ai-insights', getAiInsights);

export default router;
