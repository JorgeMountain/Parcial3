import PatientModel from '../models/patientModel.js';

class PatientService {
  // Obtener los datos de un paciente por ID
  static async getPatientById(patientId) {
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient;
  }

  // Obtener todas las citas de un paciente
  static async getAppointmentsByPatientId(patientId) {
    const appointments = await PatientModel.getAppointmentsByPatientId(patientId);
    return appointments;
  }
}

export default PatientService;
