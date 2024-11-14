// src/models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, // Cambiado a false para permitir la creación inicial sin contraseña
  },
  passwordCreada: {
    type: Boolean,
    default: false,
    required: true
  },
  telefono: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'conductor', 'pasajero'],
  },
  activo: {
    type: Boolean,
    default: true,
  },
  direccion: {
    type: String,
    validate: {
      validator: function(v) {
        // La dirección solo es válida si el rol es 'pasajero'
        return this.role !== 'pasajero' || (this.role === 'pasajero' && v && v.length > 0);
      },
      message: props => `La dirección es requerida para los pasajeros`
    },
    required: function() {
      return this.role === 'pasajero';
    }
  },
}, { timestamps: true });

// Middleware pre-save para asegurar que solo los pasajeros tengan dirección
usuarioSchema.pre('save', function(next) {
  if (this.role !== 'pasajero') {
    this.direccion = undefined;
  }
  next();
});


const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;