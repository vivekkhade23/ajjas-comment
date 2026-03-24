import mongoose from 'mongoose';

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    plan: {
      type: String,
      enum: ['free', 'starter', 'growth', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'past_due', 'canceled'],
      default: 'active'
    }
  },
  { timestamps: true }
);

export const Tenant = mongoose.model('Tenant', tenantSchema);
