// src/controllers/pasajeroController.js
const Usuario = require('../models/usuario');
const Asignacion = require('../models/asignacion');
const Vehiculo = require('../models/vehiculo').Vehiculo;
const bcrypt = require('bcryptjs');

// Ver perfil del pasajero
exports.verPerfil = async (req, res) => {
  try {
    const pasajero = await Usuario.findById(req.user.id).select('-password');
    if (!pasajero) {
      return res.status(404).json({ message: 'Pasajero no encontrado' });
    }
    res.json(pasajero);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: err.message });
  }
};

// Editar perfil del pasajero
exports.editarPerfil = async (req, res) => {
  try {
    const { id } = req.user;
    const { telefono, nombre, apellido } = req.body;

    if (!telefono && !nombre && !apellido) {
      return res.status(400).json({ message: 'Se requiere al menos un campo para actualizar' });
    }

    const actualizaciones = {};
    if (telefono) actualizaciones.telefono = telefono;
    if (nombre) actualizaciones.nombre = nombre;
    if (apellido) actualizaciones.apellido = apellido;

    const pasajeroActualizado = await Usuario.findByIdAndUpdate(id, actualizaciones, { new: true }).select('-password');
    
    if (!pasajeroActualizado) {
      return res.status(404).json({ message: 'Pasajero no encontrado' });
    }
    
    return res.status(200).json(pasajeroActualizado);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
};

// Actualizar contraseña
exports.actualizarContrasena = async (req, res) => {
  try {
    const { contrasenaActual, nuevaContrasena } = req.body;
    const pasajero = await Usuario.findById(req.user.id);

    if (!pasajero) {
      return res.status(404).json({ message: 'Pasajero no encontrado' });
    }

    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(contrasenaActual, pasajero.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    pasajero.password = await bcrypt.hash(nuevaContrasena, salt);
    await pasajero.save();

    res.json({ message: 'Contraseña actualizada con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la contraseña', error: err.message });
  }
};

// Crear contraseña en el primer inicio de sesión
exports.crearContrasenaInicial = async (req, res) => {
  try {
    const { id } = req.user;
    const { nuevaContrasena } = req.body;

    const pasajero = await Usuario.findById(id);
    if (!pasajero) {
      return res.status(404).json({ message: 'Pasajero no encontrado' });
    }

    if (pasajero.passwordCreada) {
      return res.status(400).json({ message: 'La contr asena ya ha sido creada anteriormente' });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    pasajero.password = await bcrypt.hash(nuevaContrasena, salt);
    pasajero.passwordCreada = true;
    await pasajero.save();
    res.json({ message: 'Contraseña creada con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la contraseña inicial', error: err.message });
  }
};

// Ver conductor asignado
exports.verConductorAsignado = async (req, res) => {
  try {
    const asignacion = await Asignacion.findOne({ rutsPasajeros: req.user.id });
    if (!asignacion) {
      return res.status(404).json({ message: 'Asignación no encontrada' });
    }

    const conductor = await Usuario.findById(asignacion.rutConductor);
    const vehiculo = await Vehiculo.findById(conductor.vehiculo_id);

    if (!conductor || !vehiculo) {
      return res.status(404).json({ message: 'Conductor o vehículo no encontrados' });
    }

    const datosConductor = {
      nombre: conductor.nombre,
      apellido: conductor.apellido,
      telefono: conductor.telefono,
      vehiculo: {
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        patente: vehiculo.patente,
      },
    };

    res.json(datosConductor);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el conductor asignado', error: err.message });
  }
};