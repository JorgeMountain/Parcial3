import express from 'express';
import AppointmentController from '../controllers/appointmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener detalles de una cita específica por ID
router.get('/:appointmentId', authMiddleware, AppointmentController.getAppointmentById);

export default router;
