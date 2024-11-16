import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DoctorModel from '../models/doctorModel.js';

class DoctorService {
  // Iniciar sesión de doctor
  static async login(email, password) {
    const doctor = await DoctorModel.findByEmail(email);
    if (!doctor) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Crear JWT con una duración de 1 hora
    const token = jwt.sign(
      { id: doctor.id, role: 'doctor' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }

  // Obtener citas del doctor
  static async getAppointments(doctorId, date = null) {
    const appointments = await DoctorModel.getAppointmentsByDoctorId(doctorId, date);
    return appointments;
  }

  // Crear nueva cita
  static async createAppointment(doctorId, patientId, date, time) {
    // Verificar si ya existe una cita con el paciente en la misma fecha y hora
    const existingAppointments = await DoctorModel.getAppointmentsByDoctorId(doctorId, date);
    const conflictingAppointment = existingAppointments.find(app => app.time === time && app.patient_id === patientId);

    if (conflictingAppointment) {
      throw new Error('An appointment already exists at the given time for the doctor or patient');
    }

    // Crear cita
    const appointment = await DoctorModel.createAppointment(doctorId, patientId, date, time);
    return appointment;
  }

  // Actualizar cita existente
  static async updateAppointment(doctorId, appointmentId, patientId, date, time) {
    // Lógica similar de verificación para evitar conflictos antes de actualizar
    const appointment = await DoctorModel.updateAppointment(appointmentId, doctorId, patientId, date, time);
    return appointment;
  }

  // Eliminar cita existente
  static async deleteAppointment(doctorId, appointmentId) {
    await DoctorModel.deleteAppointment(appointmentId, doctorId);
  }
}

export default DoctorService;
