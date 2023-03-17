import mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
  host: 'dpg-cga6ukkeoogtbdu5qpmg-a',
  user: 'mget_blog_db_user',
  password: process.env.DB_PW,
  database: 'mget_blog_db',
});
