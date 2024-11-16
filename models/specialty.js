import db from './db.js';

class Specialty {
    static async findAll() {
        const query = 'SELECT * FROM specialties';
        const { rows } = await db.query(query);
        return rows;
    }

    static async create({ name }) {
        const query = `
            INSERT INTO specialties (name)
            VALUES ($1)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [name]);
        return rows[0];
    }
}

export default Specialty;
