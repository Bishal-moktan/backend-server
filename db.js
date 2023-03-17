import mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12606549',
  password: process.env.DB_PW,
  database: 'sql12606549',
});
