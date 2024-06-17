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

const allowedOrigins = [
    'http://localhost:5173',
    'https://njwtc2fj-5173.usw3.devtunnels.ms'
];

A.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin, like mobile apps or curl requests
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
