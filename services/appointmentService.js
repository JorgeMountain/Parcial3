import AppointmentModel from '../models/appointmentModel.js';

class AppointmentService {
  // Obtener todas las citas (opcional para administración)
  static async getAllAppointments(date = null, specialtyId = null) {
    const appointments = await AppointmentModel.getAllAppointments(date, specialtyId);
    return appointments;
  }
}

export default AppointmentService;
