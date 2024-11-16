import { Router } from 'express';
import appointmentController from '../controllers/appointmentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para obtener todas las citas 
router.get('/', authMiddleware, appointmentController.getAllAppointments);

export default router;
