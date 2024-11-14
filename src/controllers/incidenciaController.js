const Incidencia = require('../models/incidencia');

exports.crearIncidencia = async (req, res) => {
  try {
      const { descripcion, vehiculo_id } = req.body;
      const { id, role } = req.user;

      if (role !== 'conductor' && role !== 'pasajero') {
          return res.status(403).json({ message: 'No tienes permiso para crear incidencias' });
      }

      const nuevaIncidencia = new Incidencia({
          descripcion,
          vehiculo_id,
          estado: estadoIncidenciaEnum.REPORTADA,
          createdBy: id,
      });

      const incidenciaGuardada = await nuevaIncidencia.save();
      res.status(201).json(incidenciaGuardada);
  } catch (err) {
      res.status(500).json({ message: 'Error al crear la incidencia', error: err.message });
  }
};

// Obtener todas las incidencias (Administrador)
exports.obtenerIncidencias = async (req, res) => {
    try {
        const incidencias = await Incidencia.find().populate('vehiculo_id');
        res.json(incidencias);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las incidencias', error: err.message });
    }
};

// Obtener una incidencia por ID
exports.obtenerIncidenciaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const incidencia = await Incidencia.findById(id).populate('vehiculo_id');

        if (!incidencia) {
            return res.status(404).json({ message: 'Incidencia no encontrada' });
        }

        res.json(incidencia);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener la incidencia', error: err.message });
    }
};

// Actualizar una incidencia (administrador)
exports.actualizarIncidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, estado } = req.body;

        if (estado && !Object.values(estadoIncidenciaEnum).includes(estado)) {
            return res.status(400).json({ message: 'Estado inválido' });
        }

        const incidenciaActualizada = await Incidencia.findByIdAndUpdate(
            id,
            { descripcion, estado },
            { new: true }
        );

        if (!incidenciaActualizada) {
            return res.status(404).json({ message: 'Incidencia no encontrada' });
        }

        res.json(incidenciaActualizada);
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar la incidencia', error: err.message });
    }
};

// Cambiar el estado de una incidencia (Administrador)
exports.cambiarEstadoIncidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!Object.values(estadoIncidenciaEnum).includes(estado)) {
            return res.status(400).json({ message: 'Estado inválido' });
        }

        const incidenciaActualizada = await Incidencia.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!incidenciaActualizada) {
            return res.status(404).json({ message: 'Incidencia no encontrada' });
        }
        res.json({ message: `Incidencia actualizada a ${estado}`, incidencia: incidenciaActualizada });
    } catch (err) {
        res.status(500).json({ message: 'Error al cambiar el estado de la incidencia', error: err.message });
    }
};

// Eliminar una incidencia (administrador)
exports.eliminarIncidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const incidenciaEliminada = await Incidencia.findByIdAndDelete(id);

        if (!incidenciaEliminada) {
            return res.status(404).json({ message: 'Incidencia no encontrada' });
        }

        res.json({ message: 'Incidencia eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la incidencia', error: err.message });
    }
};

// Obtener incidencias por vehículo
exports.obtenerIncidenciasPorVehiculo = async (req, res) => {
    try {
        const { vehiculoId } = req.params;
        const incidencias = await Incidencia.find({ vehiculo_id: vehiculoId }).populate('vehiculo_id');
        res.json(incidencias);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las incidencias del vehículo', error: err.message });
    }
};

// Obtener incidencias por estado
exports.obtenerIncidenciasPorEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        if (!Object.values(estadoIncidenciaEnum).includes(estado)) {
            return res.status(400).json({ message: 'Estado inválido' });
        }
        const incidencias = await Incidencia.find({ estado }).populate('vehiculo_id');
        res.json(incidencias);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las incidencias por estado', error: err.message });
    }
};

// Obtener estadísticas de incidencias
exports.obtenerEstadisticasIncidencias = async (req, res) => {
    try {
        const totalIncidencias = await Incidencia.countDocuments();
        const incidenciasPorEstado = await Incidencia.aggregate([
            { $group: { _id: "$estado", count: { $sum: 1 } } }
        ]);

        res.json({
            totalIncidencias,
            incidenciasPorEstado: incidenciasPorEstado.reduce((acc, curr) => {
                acc[curr._id] = curr.count;
                return acc;
            }, {})
        });
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las estadísticas de incidencias', error: err.message });
    }
};

// Ver Incidencias (Conductor y Pasajero)
exports.incidenciasPorUsuario = async (req, res) => {
  try {
      const { id, role } = req.user;

      if (role !== 'conductor' && role !== 'pasajero') {
          return res.status(403).json({ message: 'No tienes permiso para ver estas incidencias' });
      }

      const incidencias = await Incidencia.find({ createdBy: id })
          .populate('vehiculo_id')
          .sort({ createdAt: -1 }); // Ordenar por fecha de creación, las más recientes primero

      return res.status(200).json(incidencias);
  } catch (error) {
      return res.status(500).json({ mensaje: 'Error al obtener las incidencias del usuario', error: error.message });
  }
};