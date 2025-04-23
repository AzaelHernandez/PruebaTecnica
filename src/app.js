import express from 'express'
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';


const app = express()

app.use(morgan('dev'));//mostrar la peticion de llegada
app.use(express.json());//mostrar los datos json
app.use("/api",authRoutes);//procesar las rutas
app.use("/api", userRoutes);


export default app;
