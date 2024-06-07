import express from 'express';
import deviceRoutes from './routes/deviceRoutes';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', deviceRoutes);

module.exports = app;