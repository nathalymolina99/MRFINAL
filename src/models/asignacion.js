// src/models/Asignacion.js
const mongoose = require('mongoose');

const asignacionSchema = new mongoose.Schema({
  idAsignacion: {
    type: String,
    unique: true,
  },
  rutConductor: {
    type: String,
    required: true,
  },
  rutsPasajeros: [{
    type: String,
    required: true,
  }],
  estadoAsignacion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

asignacionSchema.pre('save', async function(next) {
  if (!this.idAsignacion) {
    const rutSinGuion = this.rutConductor.replace(/\D/g, '');
    let sufijo = '';
    let idAsignacion = `A${rutSinGuion}${sufijo}`;
    let asignacionExistente = await mongoose.model('Asignacion').findOne({ idAsignacion });
    
    while (asignacionExistente) {
      sufijo = String.fromCharCode((sufijo.charCodeAt(0) || 64) + 1);
      idAsignacion = `A${rutSinGuion}${sufijo}`;
      asignacionExistente = await mongoose.model('Asignacion').findOne({ idAsignacion });
    }
    
    this.idAsignacion = idAsignacion;
  }
  next();
});

const Asignacion = mongoose.model('asignacion', asignacionSchema);
module.exports = Asignacion;