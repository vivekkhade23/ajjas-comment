import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true },
    razorpayId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ['created', 'active', 'halted', 'cancelled', 'completed', 'past_due'],
      default: 'created'
    },
    plan: {
      type: String,
      enum: ['starter', 'growth', 'enterprise'],
      required: true
    }
  },
  { timestamps: true }
);

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
