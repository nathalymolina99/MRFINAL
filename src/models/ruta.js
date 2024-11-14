// src/models/ruta.js
const mongoose = require('mongoose');

const estadoRutaEnum = {
  ACTIVO: 'activo',
  INACTIVO: 'inactivo',
  MANTENIMIENTO: 'en mantenimiento',
};

const rutaSchema = new mongoose.Schema({
  idRuta: { 
    type: String, 
    required: true, 
    unique: true 
  },
  fechaRealizacion: {
    type: Date,
    required: true
  },
  horaComienzo: { 
    type: Date, 
    required: true 
  },
  horaFinalizacionEstimada: { 
    type: Date, 
    required: true 
  },
  idAsignacion: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Asignacion',
    required: true  // Añadido required: true
  },
  estado: {
    type: String,
    enum: Object.values(estadoRutaEnum),
    required: true,
  },
}, { timestamps: true });


rutaSchema.pre('save', async function(next) {
  if (!this.idRuta) {
    const fecha = this.fechaRealizacion.toISOString().split('T')[0].replace(/-/g, '');
    let sufijo = '';
    let idRuta = `R${fecha}${sufijo}`;
    let rutaExistente = await mongoose.model('Ruta').findOne({ idRuta });
    
    while (rutaExistente) {
      sufijo = String.fromCharCode((sufijo.charCodeAt(0) || 64) + 1);
      idRuta = `R${fecha}${sufijo}`;
      rutaExistente = await mongoose.model('Ruta').findOne({ idRuta });
    }
    
    this.idRuta = idRuta;
  }
  next();
});

const Ruta = mongoose.model('Ruta', rutaSchema);
module.exports = { Ruta, estadoRutaEnum };