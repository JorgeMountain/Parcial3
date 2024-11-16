import db from './db.js';

class Appointment {
    static async create({ patientId, doctorId, date, time }) {
        const query = `
            INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [patientId, doctorId, date, time];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM appointments WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async update(id, { patientId, doctorId, date, time }) {
        const query = `
            UPDATE appointments
            SET patient_id = $1, doctor_id = $2, appointment_date = $3, appointment_time = $4
            WHERE id = $5
            RETURNING *;
        `;
        const values = [patientId, doctorId, date, time, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }
}

export default Appointment;
