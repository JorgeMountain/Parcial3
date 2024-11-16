import pool from '../config/db.js';


class PatientModel {
  // Buscar un paciente por su ID
  static async findById(patientId) {
    const query = 'SELECT * FROM patients WHERE id = $1';
    const { rows } = await pool.query(query, [patientId]);
    return rows[0];
  }

  // Obtener citas de un paciente
  static async getAppointmentsByPatientId(patientId) {
    const query = `SELECT * FROM appointments WHERE patient_id = $1`;
    const { rows } = await pool.query(query, [patientId]);
    return rows;
  }
}

export default PatientModel;
