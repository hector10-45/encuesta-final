import mongoose from 'mongoose';

const encuestaSchema = new mongoose.Schema({
    cliente: { type: String, required: true },
    atencion: { type: Number, min: 1, max: 5, required: true },
    tiempoRespuesta: { type: Number, min: 1, max: 5, required: true },
    resolucion: { type: Number, min: 1, max: 5, required: true },
    // Campos calculados que guardaremos para facilitar las gráficas
    promedio: { type: Number },
    clasificacion: { type: String },
    fecha: { type: Date, default: Date.now }
});

export default mongoose.model('Encuesta', encuestaSchema);