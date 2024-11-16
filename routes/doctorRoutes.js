import { Router } from 'express';
import { body } from 'express-validator';
import doctorController from '../controllers/doctorController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateInputs from '../middlewares/validateInputs.js';

const router = Router();

// Ruta para saludar con un "Hola gigante"
router.get('/saludo', (req, res) => {
  res.send('¡HOLA GIGANTE!');
});

// Ruta de prueba para verificar que la configuración funciona correctamente
router.get('/test', (req, res) => {
  res.send('Ruta de prueba funcionando correctamente.');
});

// Ruta para el inicio de sesión del médico
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ],
  //validateInputs,
  doctorController.login
);

// Ruta para obtener todas las citas del médico
router.get('/appointment', authMiddleware, doctorController.getAppointments);

// Ruta para crear una nueva cita
router.post(
  '/appointment',
  [
    authMiddleware,
    body('patientId').isInt().withMessage('Valid patient ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Valid time in HH:mm format is required')
  ],
  validateInputs,
  doctorController.createAppointment
);

// Ruta para actualizar una cita específica
router.put(
  '/appointment/:appointmentId',
  [
    authMiddleware,
    body('patientId').isInt().withMessage('Valid patient ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Valid time in HH:mm format is required')
  ],
  validateInputs,
  doctorController.updateAppointment
);

// Ruta para eliminar una cita específica
router.delete('/appointment/:appointmentId', authMiddleware, doctorController.deleteAppointment);

export default router;
