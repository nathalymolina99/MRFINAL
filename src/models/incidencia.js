// src/models/incidencia.js
const mongoose = require('mongoose');

const estadoIncidenciaEnum = {
  REPORTADA: 'reportada',
  EN_PROCESO: 'en proceso',
  RESUELTA: 'resuelta',
};

const incidenciaSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  vehiculo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehiculo',
    required: true,
  },
  estado: {
    type: String,
    enum: Object.values(estadoIncidenciaEnum), 
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
}, { timestamps: true });

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);
module.exports = { Incidencia, estadoIncidenciaEnum };