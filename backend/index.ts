import express from 'express';
import { AppDataSource } from './config/db.config';
import userRoutes from './routes/user.route'; 

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize().then(() => {
    console.log("Conectado a Neon PostgreSQL");
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));