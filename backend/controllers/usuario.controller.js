import Encuesta from '../models/encuesta.model.js';

export const crearEncuesta = async (req, res) => {
    try {
        const { cliente, atencion, tiempoRespuesta, resolucion } = req.body;

        // 1. Aplicar fórmula del promedio
        const promedio = (atencion + tiempoRespuesta + resolucion) / 3;

        // 2. Aplicar lógica de clasificación
        let clasificacion = "";
        if (promedio >= 4.5) clasificacion = "Excelente";
        else if (promedio >= 3) clasificacion = "Aceptable";
        else clasificacion = "Deficiente";

        // 3. Crear el objeto para la DB
        const nuevaEncuesta = new Encuesta({
            cliente,
            atencion,
            tiempoRespuesta,
            resolucion,
            promedio: promedio.toFixed(2), // Solo 2 decimales
            clasificacion
        });

        // 4. Guardar en tu MongoDB Local
        await nuevaEncuesta.save();
        
        res.status(201).json({
            mensaje: "Encuesta procesada con éxito",
            datos: nuevaEncuesta
        });

    } catch (error) {
        res.status(400).json({ mensaje: "Error al procesar", error: error.message });
    }
};

export const obtenerReporteIndicadores = async (req, res) => {
    try {
        const encuestas = await Encuesta.find();
        
        if (encuestas.length === 0) {
            return res.json({ mensaje: "No hay datos suficientes" });
        }

        // Sumamos todos los puntajes
        let totalAtencion = 0;
        let totalTiempo = 0;
        let totalResolucion = 0;

        encuestas.forEach(e => {
            totalAtencion += e.atencion;
            totalTiempo += e.tiempoRespuesta;
            totalResolucion += e.resolucion;
        });

        // Sacamos el promedio de cada uno
        const promedios = [
            { nombre: "Atención", valor: totalAtencion / encuestas.length },
            { nombre: "Tiempo de Respuesta", valor: totalTiempo / encuestas.length },
            { nombre: "Resolución", valor: totalResolucion / encuestas.length }
        ];

        // Ordenamos para saber cuál es el mejor y el peor
        promedios.sort((a, b) => b.valor - a.valor);

        res.json({
            mejorEvaluado: promedios[0],
            peorEvaluado: promedios[promedios.length - 1],
            todos: promedios
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};