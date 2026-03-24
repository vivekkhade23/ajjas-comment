import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const membershipSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'staff'],
      default: 'staff'
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'staff'],
      default: 'staff'
    },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    tenants: [membershipSchema]
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(rawPassword) {
  return bcrypt.compare(rawPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
