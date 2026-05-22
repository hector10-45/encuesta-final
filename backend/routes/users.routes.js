import express from 'express';
import { crearEncuesta, obtenerReporteIndicadores } from '../controllers/usuario.controller.js';
 
const router = express.Router();
 
// Ruta para guardar la encuesta (POST) - ¡Cámbiala a '/' para que reciba directo!
router.post('/', crearEncuesta);
 
// Ruta para obtener el reporte de mejor/peor (GET)
router.get('/reporte', obtenerReporteIndicadores);
 
// Ruta de prueba
router.get('/test', (req, res) => {
    res.send('¡La ruta de usuarios funciona en el puerto 4000!');
});
 
export default router;
 