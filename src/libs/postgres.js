import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); //Carga el archivo .env antes de acceder a process.env

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST?.trim() || 'localhost', //Elimina espacios y caracteres ocultos
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER?.trim(),
    password: process.env.DB_PASSWORD?.trim(),
    database: process.env.DB_NAME?.trim() || 'tasks',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

export { pool };


