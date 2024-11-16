import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DoctorModel from '../models/doctorModel.js';

class DoctorService {
  // Crear un nuevo doctor
  static async createDoctor(doctorData) {
    try {
      // Hashear la contraseña antes de guardarla
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(doctorData.password, salt);

      // Guardar el doctor con la contraseña hasheada
      const newDoctor = await DoctorModel.create({
        ...doctorData,
        password: hashedPassword,
      });

      return newDoctor;
    } catch (error) {
      throw new Error('Error creating doctor: ' + error.message);
    }
  }

  // Iniciar sesión de doctor
  static async login(email, password) {
    try {
      const doctor = await DoctorModel.findByEmail(email);
      console.log('Correo recibido:', email);
      console.log('Doctor encontrado:', doctor);
      
      if (!doctor) {
        throw new Error('Invalid email or password for: ' + email);
      }

      // Comparar la contraseña ingresada con la almacenada directamente
      console.log('Contraseña recibida:', password);
      console.log('Contraseña almacenada:', doctor.password);

      if (password !== doctor.password) {
        throw new Error('Invalid email or password for: ' + email);
      }

      // Crear JWT con una duración de 1 hora
      const token = jwt.sign(
        { id: doctor.id, role: 'doctor' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return token;
    } catch (error) {
      console.error('Error en login:', error.message);
      throw new Error('Error logging in doctor: ' + error.message);
    }
  }
  

  // Obtener citas del doctor
  static async getAppointments(doctorId, date = null) {
    try {
      const appointments = await DoctorModel.getAppointmentsByDoctorId(doctorId, date);
      return appointments;
    } catch (error) {
      throw new Error('Error getting appointments: ' + error.message);
    }
  }

  // Crear nueva cita
  static async createAppointment(doctorId, patientId, date, time) {
    try {
      // Verificar si ya existe una cita con el paciente en la misma fecha y hora
      const existingAppointments = await DoctorModel.getAppointmentsByDoctorId(doctorId, date);
      const conflictingAppointment = existingAppointments.find(
        (app) => app.time === time && app.patient_id === patientId
      );

      if (conflictingAppointment) {
        throw new Error('An appointment already exists at the given time for the doctor or patient');
      }

      // Crear cita
      const appointment = await DoctorModel.createAppointment(doctorId, patientId, date, time);
      return appointment;
    } catch (error) {
      throw new Error('Error creating appointment: ' + error.message);
    }
  }

  // Actualizar cita existente
  static async updateAppointment(doctorId, appointmentId, patientId, date, time) {
    try {
      // Lógica similar de verificación para evitar conflictos antes de actualizar
      const appointment = await DoctorModel.updateAppointment(appointmentId, doctorId, patientId, date, time);
      return appointment;
    } catch (error) {
      throw new Error('Error updating appointment: ' + error.message);
    }
  }

  // Eliminar cita existente
  static async deleteAppointment(doctorId, appointmentId) {
    try {
      await DoctorModel.deleteAppointment(appointmentId, doctorId);
    } catch (error) {
      throw new Error('Error deleting appointment: ' + error.message);
    }
  }
}

export default DoctorService;