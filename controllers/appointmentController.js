import AppointmentService from '../services/appointmentService.js';

class AppointmentController {
  // Obtener todas las citas 
  static async getAllAppointments(req, res) {
    const { date, specialtyId } = req.query; // Opcionalmente filtrar por fecha o especialidad
    try {
      const appointments = await AppointmentService.getAllAppointments(date, specialtyId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default AppointmentController;
