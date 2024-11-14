const Usuario = require('../models/usuario');
const Ruta = require('../models/ruta');
const Asignacion = require('../models/asignacion');
const bcrypt = require('bcrypt');
const Vehiculo = require('../models/vehiculo');


exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

//         CRUD CONDUCTOR

// Crear un nuevo conductor
exports.crearConductor = async (req, res) => {
  try {
    const { rut, nombre, apellido, telefono, vehiculoId } = req.body;
    const hashedPassword = await bcrypt.hash(rut, 10); // Usa el RUT como contraseña inicial
    
    // Verificar si el vehículo existe
    if (vehiculoId) {
      const vehiculo = await Vehiculo.findById(vehiculoId);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
    }

    const nuevoConductor = new Usuario({
      rut,
      nombre,
      apellido,
      password: hashedPassword,
      telefono,
      role: 'conductor',
      vehiculo: vehiculoId,
      primerIngreso: true
    });
    
    await nuevoConductor.save();
    res.status(201).json(nuevoConductor);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el conductor', error: err.message });
  }
};

// Obtener todos los conductores
exports.obtenerConductores = async (req, res) => {
  try {
    const conductores = await Usuario.find({ rol: 'conductor' });
    res.json(conductores);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los conductores', error: err.message });
  }
};

// Actualizar un conductor
exports.actualizarConductor = async (req, res) => {
  try {
    const { nombre, apellido, telefono, vehiculoId } = req.body;
    
    if (vehiculoId) {
      const vehiculo = await Vehiculo.findById(vehiculoId);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
    }

    const conductorActualizado = await Usuario.findOneAndUpdate(
      { _id: req.params.id, role: 'conductor' },
      { nombre, apellido, telefono, vehiculo: vehiculoId },
      { new: true }
    );

    if (!conductorActualizado) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }

    res.json(conductorActualizado);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el conductor', error: err.message });
  }
};

// Eliminar un conductor
exports.eliminarConductor = async (req, res) => {
  try {
    const conductor = await Usuario.findOneAndDelete({ _id: req.params.id, rol: 'conductor' });
    if (!conductor) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }
    res.json({ message: 'Conductor eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el conductor', error: err.message });
  }
};


//         CRUD PASAJERO

// Crear un nuevo pasajero
exports.crearPasajero = async (req, res) => {
  try {
    const { rut, nombre, apellido, telefono, direccion } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ rut });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Ya existe un usuario con este RUT' });
    }

    // Crear el nuevo pasajero sin contraseña
    const nuevoPasajero = new Usuario({
      rut,
      nombre,
      apellido,
      telefono,
      direccion,
      role: 'pasajero',
      passwordCreada: false, // Usamos passwordCreada en lugar de primerIngreso
      activo: true
    });
    
    await nuevoPasajero.save();

    // Enviar respuesta sin incluir campos sensibles
    res.status(201).json({
      message: 'Pasajero creado exitosamente',
      pasajero: {
        id: nuevoPasajero._id,
        rut: nuevoPasajero.rut,
        nombre: nuevoPasajero.nombre,
        apellido: nuevoPasajero.apellido,
        telefono: nuevoPasajero.telefono,
        direccion: nuevoPasajero.direccion,
        role: nuevoPasajero.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el pasajero', error: err.message });
  }
};

// Obtener todos los pasajeros
exports.obtenerPasajeros = async (req, res) => {
  try {
    const pasajeros = await Usuario.find({ rol: 'pasajero' });
    res.json(pasajeros);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los pasajeros', error: err.message });
  }
};

// Obtener un pasajero por ID
exports.getPasajeroById = async (req, res) => {
  try {
    const pasajero = await Usuario.findOne({ _id: req.params.id, rol: 'pasajero' });
    if (!pasajero) {
      return res.status(404).json({ message: 'Pasajero no encontrado' });
    }
    res.json(pasajero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.actualizarPasajero = async (req, res) => {
  try {
    const { nombre, apellido, telefono, direccion } = req.body;

    // Validación básica
    if (!nombre || !apellido) {
      return res.status(400).json({ message: 'Nombre y apellido son campos requeridos' });
    }

    const pasajeroActualizado = await Usuario.findOneAndUpdate(
      { _id: req.params.id, role: 'pasajero' },
      { nombre, apellido, telefono, direccion },
      { new: true, runValidators: true }
    );

    if (!pasajeroActualizado) {
      return res.status(404).json({ message: 'Pasajero no encontrado o no tienes permiso para actualizarlo' });
    }

    res.json(pasajeroActualizado);
  } catch (err) {
    console.error('Error al actualizar el pasajero:', err);
    res.status(500).json({ message: 'Error al actualizar el pasajero', error: err.message });
  }
};


// Eliminar un pasajero
exports.eliminarPasajero = async (req, res) => {
  try {
    const pasajero = await Usuario.findOneAndDelete({ _id: req.params.id, rol: 'pasajero' });
    if (!pasajero) {
      return res.status(404).json({ message: 'Pasajero no encontrado' });
    }
    res.json({ message: 'Pasajero eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el pasajero', error: err.message });
  }
};



//         CRUD RUTA


// Crear una nueva ruta
exports.crearRuta = async (req, res) => {
  try {
    const { fechaRealizacion, horaComienzo, horaFinalizacionEstimada, idAsignacion, estado } = req.body;

    const nuevaRuta = new Ruta({
      fechaRealizacion: new Date(fechaRealizacion),
      horaComienzo: new Date(horaComienzo),
      horaFinalizacionEstimada: new Date(horaFinalizacionEstimada),
      idAsignacion,
      estado
    });

    const rutaGuardada = await nuevaRuta.save();
    res.status(201).json(rutaGuardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la ruta', error: error.message });
  }
};

// Obtener todas las rutas
exports.obtenerRutas = async (req, res) => {
  try {
    const rutas = await Ruta.find().populate('idAsignacion');
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutas', error: error.message });
  }
};

// Obtener una ruta por su ID
exports.obtenerRutaPorId = async (req, res) => {
  try {
    const ruta = await Ruta.findOne({ idRuta: req.params.idRuta }).populate('idAsignacion');
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.status(200).json(ruta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ruta', error: error.message });
  }
};

// Obtener todas las rutas
exports.obtenerRutas = async (req, res) => {
  try {
    const rutas = await Ruta.find().populate('idAsignacion');
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutas', error: error.message });
  }
};

// Obtener una ruta por su ID
exports.obtenerRutaPorId = async (req, res) => {
  try {
    const ruta = await Ruta.findOne({ idRuta: req.params.idRuta }).populate('idAsignacion');
    if (!ruta) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.status(200).json(ruta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ruta', error: error.message });
  }
};

// Actualizar una ruta
exports.actualizarRuta = async (req, res) => {
  try {
    const { fechaRealizacion, horaComienzo, horaFinalizacionEstimada, idAsignacion, estado } = req.body;

    const rutaActualizada = await Ruta.findOneAndUpdate(
      { idRuta: req.params.idRuta },
      {
        fechaRealizacion: fechaRealizacion ? new Date(fechaRealizacion) : undefined,
        horaComienzo: horaComienzo ? new Date(horaComienzo) : undefined,
        horaFinalizacionEstimada: horaFinalizacionEstimada ? new Date(horaFinalizacionEstimada) : undefined,
        idAsignacion,
        estado
      },
      { new: true, runValidators: true }
    );

    if (!rutaActualizada) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }

    res.status(200).json(rutaActualizada);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la ruta', error: error.message });
  }
};

// Eliminar una ruta
exports.eliminarRuta = async (req, res) => {
  try {
    const rutaEliminada = await Ruta.findOneAndDelete({ idRuta: req.params.idRuta });
    if (!rutaEliminada) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.status(200).json({ message: 'Ruta eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la ruta', error: error.message });
  }
};
  
  
//         CRUD ASIGNACIONES


// Crear una nueva asignación
exports.crearAsignacion = async (req, res) => {
  try {
    const { rutConductor, rutsPasajeros, estadoAsignacion, fecha } = req.body;

    const nuevaAsignacion = new Asignacion({
      rutConductor,
      rutsPasajeros,
      estadoAsignacion,
      fecha: new Date(fecha),
    });

    const asignacionGuardada = await nuevaAsignacion.save();
    res.status(201).json(asignacionGuardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la asignación', error: error.message });
  }
};

// Obtener todas las asignaciones
exports.obtenerAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.find();
    res.status(200).json(asignaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las asignaciones', error: error.message });
  }
};

// Obtener una asignación por su ID
exports.obtenerAsignacionPorId = async (req, res) => {
  try {
    const asignacion = await Asignacion.findOne({ idAsignacion: req.params.idAsignacion });
    if (!asignacion) {
      return res.status(404).json({ message: 'Asignación no encontrada' });
    }
    res.status(200).json(asignacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la asignación', error: error.message });
  }
};

// Actualizar una asignación
exports.actualizarAsignacion = async (req, res) => {
  try {
    const { rutConductor, rutsPasajeros, estadoAsignacion, fecha } = req.body;

    const asignacionActualizada = await Asignacion.findOneAndUpdate(
      { idAsignacion: req.params.idAsignacion },
      {
        rutConductor,
        rutsPasajeros,
        estadoAsignacion,
        fecha: fecha ? new Date(fecha) : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!asignacionActualizada) {
      return res.status(404).json({ message: 'Asignación no encontrada' });
    }

    res.status(200).json(asignacionActualizada);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la asignación', error: error.message });
  }
};

// Eliminar una asignación
exports.eliminarAsignacion = async (req, res) => {
  try {
    const asignacionEliminada = await Asignacion.findOneAndDelete({ idAsignacion: req.params.idAsignacion });
    if (!asignacionEliminada) {
      return res.status(404).json({ message: 'Asignación no encontrada' });
    }
    res.status(200).json({ message: 'Asignación eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la asignación', error: error.message });
  }
};



exports.activarDesactivarUsuario = async (req, res) => {
  const { rut } = req.params; 
  const { activo } = req.body; 

  // Validar que activo sea un booleano
  if (typeof activo !== 'boolean') {
      return res.status(400).json({ message: 'El valor de "activo" debe ser true o false' });
  }

  try {
      const usuarioActualizado = await Usuario.findOneAndUpdate(
          { rut: rut },
          { activo },
          { new: true }
      );

      if (!usuarioActualizado) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({
          message: `${usuarioActualizado.role.charAt(0).toUpperCase() + usuarioActualizado.role.slice(1)} ${activo ? 'activado' : 'desactivado'} exitosamente`,
          usuario: usuarioActualizado
      });
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado del usuario', error: error.message });
  }
};




// CRUD de Vehículos

// Crear un nuevo vehículo
exports.crearVehiculo = async (req, res) => {
  try {
    const nuevoVehiculo = new Vehiculo(req.body);
    await nuevoVehiculo.save();
    res.status(201).json(nuevoVehiculo);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el vehículo', error: err.message });
  }
};

// Obtener todos los vehículos
exports.obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los vehículos', error: err.message });
  }
};

// Obtener un vehículo por ID
exports.obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    res.json(vehiculo);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el vehículo', error: err.message });
  }
};

// Actualizar un vehículo
exports.actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    res.json(vehiculo);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el vehículo', error: err.message });
  }
};

// Eliminar un vehículo
exports.eliminarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    res.json({ message: 'Vehículo eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el vehículo', error: err.message });
  }
};

// Cambiar el estado de un vehículo
exports.cambiarEstadoVehiculo = async (req, res) => {
  try {
    const { estado } = req.body;
    const vehiculo = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    res.json(vehiculo);
  } catch (err) {
    res.status(500).json({ message: 'Error al cambiar el estado del vehículo', error: err.message });
  }
};