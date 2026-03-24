import { Router } from 'express';
import {
  createAppointment,
  deleteAppointment,
  listAppointments,
  updateAppointment
} from '../controllers/appointmentController.js';

const router = Router();

router.get('/', listAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
