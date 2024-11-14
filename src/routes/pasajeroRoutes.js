const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajeroController');
const authMiddleware = require('../middlewares/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Ver perfil del pasajero
router.get('/perfil', pasajeroController.verPerfil);

// Editar perfil del pasajero
router.put('/perfil', pasajeroController.editarPerfil);

// Actualizar contraseña
router.put('/actualizarcontrasena', pasajeroController.actualizarContrasena);

// Crear contraseña en el primer inicio de sesión
router.post('/crearcontrasenainicial', pasajeroController.crearContrasenaInicial);

// Ver conductor asignado
router.get('/conductorasignado', pasajeroController.verConductorAsignado);

module.exports = router;
