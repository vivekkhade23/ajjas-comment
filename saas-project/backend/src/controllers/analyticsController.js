import mongoose from 'mongoose';
import { fetchAnalytics } from '../services/analyticsService.js';
import { generateBookingInsights } from '../services/aiService.js';

export async function getAnalytics(req, res, next) {
  try {
    const data = await fetchAnalytics(new mongoose.Types.ObjectId(req.tenantId));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getAiInsights(req, res, next) {
  try {
    const data = await generateBookingInsights(new mongoose.Types.ObjectId(req.tenantId));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
