import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config(); //Carga el archivo .env antes de acceder a process.env

const sequelize = new Sequelize({
  host: process.env.DB_HOST?.trim() || 'localhost',
  username: process.env.DB_USER?.trim(),
  password: process.env.DB_PASSWORD?.trim(),
  database: process.env.DB_NAME?.trim(),
  dialect: 'postgres',
  logging: console.log
});

export { sequelize };
