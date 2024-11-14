const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductorController');
const authMiddleware = require('../middlewares/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Ver perfil del conductor
router.get('/perfil', conductorController.verPerfil);

// Editar perfil del conductor
router.put('/perfil', conductorController.editarPerfil);

// Actualizar contraseña
router.put('/actualizar-contrasena', conductorController.actualizarContrasena);

// Crear contraseña en el primer inicio de sesión
router.post('/crear-contrasena-inicial', conductorController.crearContrasenaInicial);

// Ver ruta del conductor
router.get('/ruta/:id', conductorController.verRutaConductor);

module.exports = router;