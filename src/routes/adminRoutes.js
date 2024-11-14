const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Rutas de Usuarios
router.get('/usuarios', adminController.obtenerUsuarios);

// Rutas de Conductores
router.post('/conductores', adminController.crearConductor);
router.get('/conductores', adminController.obtenerConductores);
router.put('/conductores/:id', adminController.actualizarConductor);
router.delete('/conductores/:id', adminController.eliminarConductor);

// Rutas de Pasajeros
router.post('/pasajeros', adminController.crearPasajero);
router.get('/pasajeros', adminController.obtenerPasajeros);
router.get('/pasajeros/:id', adminController.getPasajeroById);
router.put('/pasajeros/:id', adminController.actualizarPasajero);
router.delete('/pasajeros/:id', adminController.eliminarPasajero);

// Rutas de Rutas
router.post('/rutas', adminController.crearRuta);
router.get('/rutas', adminController.obtenerRutas);
router.get('/rutas/:idRuta', adminController.obtenerRutaPorId);
router.put('/rutas/:idRuta', adminController.actualizarRuta);
router.delete('/rutas/:idRuta', adminController.eliminarRuta);

// Rutas de Asignaciones
router.post('/asignaciones', adminController.crearAsignacion);
router.get('/asignaciones', adminController.obtenerAsignaciones);
router.get('/asignaciones/:idAsignacion', adminController.obtenerAsignacionPorId);
router.put('/asignaciones/:idAsignacion', adminController.actualizarAsignacion);
router.delete('/asignaciones/:idAsignacion', adminController.eliminarAsignacion);

// Ruta para activar/desactivar usuario
router.put('/usuarios/:rut/estado', adminController.activarDesactivarUsuario);

// Rutas de Vehículos
router.post('/vehiculos', adminController.crearVehiculo);
router.get('/vehiculos', adminController.obtenerVehiculos);
router.get('/vehiculos/:id', adminController.obtenerVehiculoPorId);
router.put('/vehiculos/:id', adminController.actualizarVehiculo);
router.delete('/vehiculos/:id', adminController.eliminarVehiculo);
router.put('/vehiculos/:id/estado', adminController.cambiarEstadoVehiculo);

module.exports = router;