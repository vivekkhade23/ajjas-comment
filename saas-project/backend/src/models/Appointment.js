import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true }
  },
  { timestamps: true }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
