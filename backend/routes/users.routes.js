import express from 'express';
// Un solo import para todas las funciones del controlador
import { crearEncuesta, obtenerReporteIndicadores } from '../controllers/usuario.controller.js';

const router = express.Router();

// Ruta para guardar la encuesta (POST)
router.post('/encuesta', crearEncuesta);

// Ruta para obtener el reporte de mejor/peor (GET)
router.get('/reporte', obtenerReporteIndicadores);

// Ruta de prueba
router.get('/test', (req, res) => {
    res.send('¡La ruta de usuarios funciona en el puerto 4000!');
});

export default router;