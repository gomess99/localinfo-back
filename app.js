import cors from 'cors';
import express from 'express';
import connectDatabase from './src/database/db.js';
import 'dotenv/config';
import router from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

connectDatabase();

export default app;
