import { Subscription } from '../models/Subscription.js';
import { Tenant } from '../models/Tenant.js';
import { getRazorpayClient, resolvePlanId } from '../services/razorpayService.js';
import { hmacSha256 } from '../utils/crypto.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/errors.js';

export async function createSubscription(req, res, next) {
  try {
    const { plan } = req.body;
    const client = getRazorpayClient();

    const subscription = await client.subscriptions.create({
      plan_id: resolvePlanId(plan),
      customer_notify: 1,
      total_count: 12,
      notes: { tenantId: req.tenantId, plan }
    });

    await Subscription.findOneAndUpdate(
      { razorpayId: subscription.id },
      {
        razorpayId: subscription.id,
        tenantId: req.tenantId,
        status: subscription.status,
        plan
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
}

export async function razorpayWebhook(req, res, next) {
  try {
    const signature = req.header('x-razorpay-signature');
    const rawBody = JSON.stringify(req.body);

    if (!signature || !env.razorpayWebhookSecret) {
      throw new ApiError(401, 'Invalid webhook setup');
    }

    const digest = hmacSha256(rawBody, env.razorpayWebhookSecret);
    if (digest !== signature) {
      throw new ApiError(401, 'Webhook signature mismatch');
    }

    const event = req.body.event;
    const payload = req.body.payload?.subscription?.entity;

    if (event === 'subscription.activated' && payload) {
      const record = await Subscription.findOneAndUpdate(
        { razorpayId: payload.id },
        { status: payload.status },
        { new: true }
      );

      if (record) {
        await Tenant.findByIdAndUpdate(record.tenantId, { plan: record.plan, status: 'active' });
      }
    }

    if (event === 'subscription.halted' && payload) {
      const record = await Subscription.findOneAndUpdate(
        { razorpayId: payload.id },
        { status: 'past_due' },
        { new: true }
      );

      if (record) {
        await Tenant.findByIdAndUpdate(record.tenantId, { status: 'past_due' });
      }
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}
