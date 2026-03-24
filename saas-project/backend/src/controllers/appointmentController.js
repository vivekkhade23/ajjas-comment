import { Appointment } from '../models/Appointment.js';
import { ApiError } from '../utils/errors.js';

export async function createAppointment(req, res, next) {
  try {
    const { patientName, phone, date, amount } = req.body;

    if (!patientName || !phone || !date || amount === undefined) {
      throw new ApiError(400, 'patientName, phone, date and amount are required');
    }

    const appointment = await Appointment.create({ patientName, phone, date, amount, tenantId: req.tenantId });
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
}

export async function listAppointments(req, res, next) {
  try {
    const appointments = await Appointment.find({ tenantId: req.tenantId }).sort({ date: -1 });
    res.json({ success: true, data: appointments });
  } catch (error) {
    next(error);
  }
}

export async function updateAppointment(req, res, next) {
  try {
    const updated = await Appointment.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) throw new ApiError(404, 'Appointment not found');

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
}

export async function deleteAppointment(req, res, next) {
  try {
    const deleted = await Appointment.findOneAndDelete({ _id: req.params.id, tenantId: req.tenantId });
    if (!deleted) throw new ApiError(404, 'Appointment not found');

    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
}
