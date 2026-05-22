import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// 1. IMPORTANTE: Importamos las rutas con el nombre exacto
import userRoutes from './routes/users.routes.js';

// Configuración de variables de entorno
dotenv.config();

const app = express();
// Usamos el puerto 4000 que me indicaste
const PORT = process.env.PORT || 4000;

// 2. MIDDLEWARES (Deben ir antes de las rutas)
app.use(cors());
app.use(express.json()); // Esto permite que el servidor entienda el JSON que envías desde Thunder Client
app.use(morgan('dev'));

// 3. CONEXIÓN A MONGODB LOCAL
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ ¡EXITO! Conectado a MongoDB Local');
        
        // Arrancamos el servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ ERROR de conexión:', err.message);
        process.exit(1);
    });

// 4. RUTAS
// Aquí conectamos el prefijo /api/usuarios con tu archivo de rutas
app.use('/api/usuarios', userRoutes);

// Ruta base para probar en el navegador
app.get('/', (req, res) => {
    res.send('Servidor de Ronald corriendo en el puerto 4000');
});