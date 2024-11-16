import pkg from 'pg';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Desestructurar `Pool` desde el paquete `pg`
const { Pool } = pkg;

// Crear una nueva instancia de Pool para gestionar las conexiones a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Probar la conexión
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
  } else {
    console.log('Conexión exitosa con la base de datos');
  }
});

// Exportar el pool para que pueda ser utilizado por los modelos
export default pool;
