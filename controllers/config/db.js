import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Crear una nueva instancia de Pool para gestionar las conexiones a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Probar la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err.stack);
  } else {
    console.log('Conexión exitosa con la base de datos');
  }
  release(); // Liberar el cliente una vez probado
});

// Exportar el pool para que los modelos puedan utilizarlo
export default pool;
