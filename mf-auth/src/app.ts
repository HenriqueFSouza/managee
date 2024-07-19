import 'mongoose';
import express, { Response } from 'express';
import cors from 'cors'

import "./database"
import userRouter from './routes/userRoutes';
import eventRouter from './routes/eventRoutes';
import dashboardRouter from './routes/dashboardRoutes';
import authRouter from './routes/authRoute';


const app = express();

app.use(express.json());

app.use(cors(({
  origin: ['https://managee-mf-container.onrender.com/', 'https://managee-mf-event.onrender.com/', 'https://managee-mf-admin.onrender.com'],
  credentials: true,
  methods: 'GET, PUT, POST, DELTE, OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
})))

app.use(userRouter);
app.use(eventRouter);
app.use(dashboardRouter);
app.use(authRouter);

// Health check route
app.get('/', (_, res: Response) => {
  return res.status(200).json({ ok: true })
})

export default app;
