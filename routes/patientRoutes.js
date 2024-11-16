import { Router } from 'express';
import patientController from '../controllers/patientController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para obtener la información de un paciente por su ID
router.get('/:patientId', authMiddleware, patientController.getPatient);

// Ruta para obtener todas las citas de un paciente
router.get('/:patientId/appointment', authMiddleware, patientController.getPatientAppointments);

export default router;
