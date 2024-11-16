import { AppointmentService } from '../services/appointmentService.js';

class AppointmentController {
    async getAppointmentById(req, res) {
        const { appointmentId } = req.params;
        try {
            const appointment = await AppointmentService.getAppointmentById(appointmentId);
            res.status(200).json(appointment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new AppointmentController();
