const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');
const authMiddleware = require('../middlewares/auth');


// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Rutas accesibles para conductores y pasajeros
router.post('/', incidenciaController.crearIncidencia);
router.get('/usuario', incidenciaController.incidenciasPorUsuario);

// Rutas accesibles solo para administradores
router.get('/', incidenciaController.obtenerIncidencias);
router.get('/:id', incidenciaController.obtenerIncidenciaPorId);
router.put('/:id', incidenciaController.actualizarIncidencia);
router.patch('/:id/estado', incidenciaController.cambiarEstadoIncidencia);
router.delete('/:id',incidenciaController.eliminarIncidencia);
router.get('/vehiculo/:vehiculoId',incidenciaController.obtenerIncidenciasPorVehiculo);
router.get('/estado/:estado', incidenciaController.obtenerIncidenciasPorEstado);
router.get('/estadisticas', incidenciaController.obtenerEstadisticasIncidencias);

module.exports = router;