import { DoctorService } from '../services/doctorService.js';

class DoctorController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await DoctorService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAppointments(req, res) {
        const doctorId = req.user.id; // Obtenido del token JWT
        const { date } = req.query;
        try {
            const appointments = await DoctorService.getAppointments(doctorId, date);
            res.status(200).json(appointments);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createAppointment(req, res) {
        const doctorId = req.user.id; // Obtenido del token JWT
        const { patientId, date, time } = req.body;
        try {
            const appointment = await DoctorService.createAppointment(doctorId, patientId, date, time);
            res.status(201).json(appointment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteAppointment(req, res) {
        const { appointmentId } = req.params;
        try {
            await DoctorService.deleteAppointment(appointmentId);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new DoctorController();
