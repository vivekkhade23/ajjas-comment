import Razorpay from 'razorpay';
import { env } from '../config/env.js';
import { ApiError } from '../utils/errors.js';

const PLANS = {
  starter: process.env.RAZORPAY_PLAN_STARTER,
  growth: process.env.RAZORPAY_PLAN_GROWTH,
  enterprise: process.env.RAZORPAY_PLAN_ENTERPRISE
};

let client;

export function getRazorpayClient() {
  if (!client) {
    if (!env.razorpayKeyId || !env.razorpayKeySecret) {
      throw new ApiError(500, 'Razorpay keys are not configured');
    }

    client = new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret });
  }

  return client;
}

export function resolvePlanId(plan) {
  const planId = PLANS[plan];
  if (!planId) {
    throw new ApiError(400, 'Unsupported billing plan');
  }

  return planId;
}
