import mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});
