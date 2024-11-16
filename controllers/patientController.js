import PatientService from '../services/patientService.js';

class PatientController {
  // Obtener los datos de un paciente por ID
  static async getPatient(req, res) {
    const { patientId } = req.params;
    try {
      const patient = await PatientService.getPatientById(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener todas las citas de un paciente
  static async getPatientAppointments(req, res) {
    const { patientId } = req.params;
    try {
      const appointments = await PatientService.getAppointmentsByPatientId(patientId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PatientController;
