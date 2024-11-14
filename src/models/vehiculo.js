// src/models/vehiculo.js
const mongoose = require('mongoose');


const estadoVehiculoEnum = {
  DISPONIBLE: 'disponible',
  EN_USO: 'en uso',
  MANTENIMIENTO: 'en mantenimiento',
};


const vehiculoSchema = new mongoose.Schema({
  conductor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  patente: {
    type: String,
    required: true,
    unique: true,
  },
  estado: {
    type: String,
    enum: Object.values(estadoVehiculoEnum), 
    required: true,
  },
}, { timestamps: true });

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
module.exports = { Vehiculo, estadoVehiculoEnum };