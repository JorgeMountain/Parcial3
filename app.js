import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas para médicos
app.use('/doctor', doctorRoutes);

// Rutas para citas
app.use('/appointment', authMiddleware, appointmentRoutes);

// Middleware para manejar errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

