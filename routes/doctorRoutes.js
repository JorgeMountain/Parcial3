import express from 'express';
import DoctorController from '../controllers/doctorController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Iniciar sesión como médico
router.post('/login', DoctorController.login);

// Obtener las citas del médico autenticado
router.get(
    '/appointment',
    authMiddleware,           // Verifica el token JWT
    roleMiddleware('doctor'), // Verifica el rol de médico
    DoctorController.getAppointments
);

// Crear una nueva cita como médico
router.post(
    '/appointment',
    authMiddleware,
    roleMiddleware('doctor'),
    DoctorController.createAppointment
);

// Editar una cita específica
router.put(
    '/appointment/:appointmentId',
    authMiddleware,
    roleMiddleware('doctor'),
    DoctorController.updateAppointment
);

// Eliminar una cita específica
router.delete(
    '/appointment/:appointmentId',
    authMiddleware,
    roleMiddleware('doctor'),
    DoctorController.deleteAppointment
);

// Obtener los datos de un médico específico por ID
router.get('/:doctorId', DoctorController.getDoctorById);

// Listar las citas de un médico específico
router.get('/:doctorId/appointment', DoctorController.getAppointmentsByDoctorId);

export default router;
