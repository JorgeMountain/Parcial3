import Appointment from '../models/appointment.js';

class AppointmentService {
    async getAppointmentById(appointmentId) {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        return appointment;
    }

    async createAppointment({ patientId, doctorId, date, time }) {
        // Aquí puedes verificar si el médico o el paciente ya tienen citas en ese horario
        return await Appointment.create({ patientId, doctorId, date, time });
    }

    async deleteAppointment(appointmentId) {
        return await Appointment.delete(appointmentId);
    }
}

export default new AppointmentService();
