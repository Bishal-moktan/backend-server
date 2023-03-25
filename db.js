import mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection(process.env.MYSQL_URI);
