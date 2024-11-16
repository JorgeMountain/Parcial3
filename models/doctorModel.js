import pool from '../config.js';

class DoctorModel {
  // Buscar un doctor por su email
  static async findByEmail(email) {
    const query = 'SELECT * FROM doctors WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  // Obtener citas de un doctor
  static async getAppointmentsByDoctorId(doctorId, date = null) {
    let query = `SELECT * FROM appointments WHERE doctor_id = $1`;
    const values = [doctorId];

    if (date) {
      query += ' AND date = $2';
      values.push(date);
    }

    const { rows } = await pool.query(query, values);
    return rows;
  }

  // Crear una nueva cita
  static async createAppointment(doctorId, patientId, date, time) {
    const query = `INSERT INTO appointments (doctor_id, patient_id, date, time)
                   VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } = await pool.query(query, [doctorId, patientId, date, time]);
    return rows[0];
  }

  // Editar una cita
  static async updateAppointment(appointmentId, doctorId, patientId, date, time) {
    const query = `UPDATE appointments 
                   SET patient_id = $1, date = $2, time = $3
                   WHERE id = $4 AND doctor_id = $5
                   RETURNING *`;
    const { rows } = await pool.query(query, [patientId, date, time, appointmentId, doctorId]);
    return rows[0];
  }

  // Eliminar una cita
  static async deleteAppointment(appointmentId, doctorId) {
    const query = `DELETE FROM appointments WHERE id = $1 AND doctor_id = $2`;
    await pool.query(query, [appointmentId, doctorId]);
  }
}

export default DoctorModel;
