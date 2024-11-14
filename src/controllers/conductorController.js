const Usuario = require('../models/usuario');
const Ruta = require('../models/ruta'); 


const bcrypt = require('bcryptjs');

// Ver perfil del conductor
exports.verPerfil = async (req, res) => {
  try {
    const conductor = await Usuario.findById(req.user.id).select('-password');
    if (!conductor) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }
    res.json(conductor);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: err.message });
  }
};

// Editar perfil del conductor
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

    const conductorActualizado = await Usuario.findByIdAndUpdate(id, actualizaciones, { new: true }).select('-password');
    
    if (!conductorActualizado) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }
    
    return res.status(200).json(conductorActualizado);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
};

// Actualizar contraseña
exports.actualizarContrasena = async (req, res) => {
  try {
    const { contrasenaActual, nuevaContrasena } = req.body;
    const conductor = await Usuario.findById(req.user.id);

    if (!conductor) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }

    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(contrasenaActual, conductor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    conductor.password = await bcrypt.hash(nuevaContrasena, salt);
    await conductor.save();

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

    const conductor = await Usuario.findById(id);
    if (!conductor) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }

    if (conductor.passwordCreada) {
      return res.status(400).json({ message: 'La contraseña ya ha sido creada anteriormente' });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    conductor.password = await bcrypt.hash(nuevaContrasena, salt);
    conductor.passwordCreada = true;
    await conductor.save();
    res.json({ message: 'Contraseña creada con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la contraseña inicial', error: err.message });
  }
};

// Ver ruta del conductor
exports.verRutaConductor = async (req, res) => {
  try {
    const ruta = await Ruta.findById(req.params.id);
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.status(200).json(ruta);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la ruta', error: err.message });
  }
};