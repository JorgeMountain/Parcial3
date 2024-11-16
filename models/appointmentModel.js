import pool from '../config/db.js';


class AppointmentModel {
  // Obtener todas las citas 
  static async getAllAppointments(date = null, specialtyId = null) {
    let query = `SELECT a.*, d.specialty_id FROM appointments a
                 JOIN doctors d ON a.doctor_id = d.id`;
    const values = [];

    if (date) {
      query += ' WHERE a.date = $1';
      values.push(date);
    }

    if (specialtyId) {
      query += date ? ' AND' : ' WHERE';
      query += ' d.specialty_id = $' + (values.length + 1);
      values.push(specialtyId);
    }

    const { rows } = await pool.query(query, values);
    return rows;
  }
}

export default AppointmentModel;
