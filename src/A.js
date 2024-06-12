import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'


import authRoutes from './routes/auth.routes.js'
import taskRoutes from "./routes/tasks.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import vehicleRoutes from './routes/vehicle.routes.js'
import citasRoutes from './routes/citas.routes.js'
import seguimientoRoutes from './routes/seguimiento.routes.js'
import historiaRoutes from './routes/historia.routes.js';


const A = express();

A.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
A.use(morgan('dev'));
A.use(express.json());
A.use(cookieParser());

A.use("/api",authRoutes);
A.use("/api",taskRoutes);
A.use("/api",adminRoutes);
A.use("/api", vehicleRoutes);
A.use('/api', citasRoutes);
A.use('/api', seguimientoRoutes);
A.use('/api', historiaRoutes); 

export default A;
