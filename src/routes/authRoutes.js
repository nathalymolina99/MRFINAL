const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Ruta para el login
router.post('/login', login); // Usar login directamente

module.exports = router;
