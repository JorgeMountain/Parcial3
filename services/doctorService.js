import Doctor from '../models/doctor.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class DoctorService {
    async login(email, password) {
        const doctor = await Doctor.findByEmail(email);
        if (!doctor) {
            throw new Error('Doctor not found');
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generar un token JWT
        const token = jwt.sign({ id: doctor.id, role: 'doctor' }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return token;
    }

    async getAppointments(doctorId, date) {
        return await Doctor.getAppointments(doctorId, date);
    }

    async createAppointment(doctorId, patientId, date, time) {
        // Aquí podrías agregar lógica para verificar disponibilidad
        return await Appointment.create({ doctorId, patientId, date, time });
    }

    async updateAppointment(appointmentId, data) {
        return await Appointment.update(appointmentId, data);
    }

    async deleteAppointment(appointmentId) {
        return await Appointment.delete(appointmentId);
    }

    async getDoctorById(doctorId) {
        return await Doctor.findById(doctorId);
    }
}

export default new DoctorService();
