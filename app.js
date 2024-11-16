import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import doctorRoutes from './routes/doctorRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// Middlewares
app.use(bodyParser.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON

// Rutas
app.use('/doctor', doctorRoutes); // Rutas relacionadas con doctores
app.use('/patient', patientRoutes); // Rutas relacionadas con pacientes
app.use('/appointment', appointmentRoutes); // Rutas generales relacionadas con citas

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Puerto de escucha para la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
