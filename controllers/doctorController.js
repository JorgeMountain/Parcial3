import DoctorService from '../services/doctorService.js';
import jwt from 'jsonwebtoken';

class DoctorController {
  // Iniciar sesión como médico
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await DoctorService.login(email, password);
      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener citas de un médico
  static async getAppointments(req, res) {
    const { id: doctorId } = req.user; // Decodificado del JWT
    const { date } = req.query;
    try {
      const appointments = await DoctorService.getAppointments(doctorId, date);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear una nueva cita
  static async createAppointment(req, res) {
    const { id: doctorId } = req.user;
    const { patientId, date, time } = req.body;
    try {
      const appointment = await DoctorService.createAppointment(doctorId, patientId, date, time);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Editar una cita
  static async updateAppointment(req, res) {
    const { id: doctorId } = req.user;
    const { appointmentId } = req.params;
    const { patientId, date, time } = req.body;
    try {
      const updatedAppointment = await DoctorService.updateAppointment(doctorId, appointmentId, patientId, date, time);
      res.json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar una cita
  static async deleteAppointment(req, res) {
    const { id: doctorId } = req.user;
    const { appointmentId } = req.params;
    try {
      await DoctorService.deleteAppointment(doctorId, appointmentId);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default DoctorController;
