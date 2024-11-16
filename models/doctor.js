import db from './db.js';

class Doctor {
    static async findByEmail(email) {
        const query = 'SELECT * FROM doctors WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }

    static async create({ name, email, password, specialtyId }) {
        const query = `
            INSERT INTO doctors (name, email, password, specialty_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [name, email, password, specialtyId];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM doctors WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async getAppointments(doctorId, date = null) {
        let query = `
            SELECT * FROM appointments
            WHERE doctor_id = $1
        `;
        const params = [doctorId];
        if (date) {
            query += ' AND appointment_date = $2';
            params.push(date);
        }
        const { rows } = await db.query(query, params);
        return rows;
    }
}

export default Doctor;
