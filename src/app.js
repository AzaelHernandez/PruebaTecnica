import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from "cors";

const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Solo permite este origen
    methods: ["GET", "POST", "PUT", "DELETE"]
};

app.use(cors(corsOptions));
app.use(morgan('dev')); // Mostrar la petición de llegada
app.use(express.json()); // Procesar los datos json
app.use("/api", authRoutes); // Procesar las rutas de autenticación
app.use("/api", userRoutes); // Procesar las rutas de usuarios

export default app;


