import express from 'express';
import postRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.json('Hello');
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
