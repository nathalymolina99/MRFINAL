const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '24h';

function validarRut(rut) {
  // Eliminar puntos y guión del RUT
  rut = rut.replace(/\./g, '').replace('-', '');

  // Validar formato
  if (!/^[0-9]{7,8}[0-9K]$/i.test(rut)) {
    return false;
  }

  // Obtener dígito verificador
  const dv = rut.slice(-1).toUpperCase();

  // Obtener cuerpo del RUT
  const rutCuerpo = rut.slice(0, -1);

  // Calcular dígito verificador
  let suma = 0;
  let multiplicador = 2;

  for (let i = rutCuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(rutCuerpo.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  // Comparar dígito verificador calculado con el proporcionado
  return dv === dvCalculado;
}

async function actualizarContraseña(usuario, password) {
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  await usuario.save();
}

async function verificarContraseña(usuario, password) {
  if (usuario.password.startsWith('$2a$') || usuario.password.startsWith('$2b$')) {
    return await bcrypt.compare(password, usuario.password);
  }
  return password === usuario.password;
}

async function iniciarSesion(rut, password) {
  if (!validarRut(rut)) {
    throw new Error('RUT inválido');
  }

  const usuario = await Usuario.findOne({ rut });
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  const esValida = await verificarContraseña(usuario, password);
  if (!esValida) {
    throw new Error('Credenciales incorrectas');
  }

  if (password === usuario.password) {
    await actualizarContraseña(usuario, password);
  }

  const token = jwt.sign(
    { id: usuario._id, role: usuario.role },
    SECRET_KEY,
    { expiresIn: TOKEN_EXPIRATION }
  );

  return { token, usuario: { id: usuario._id, role: usuario.role } };
}

exports.iniciarSesion = async (req, res) => {
  try {
    const { rut, contrasena, password } = req.body;
    const passwordToUse = password || contrasena;
    
    if (!rut || !passwordToUse) {
      return res.status(400).json({ message: 'RUT y contraseña son requeridos' });
    }

    const result = await iniciarSesion(rut, passwordToUse);
    console.log(`Inicio de sesión exitoso para el usuario con RUT: ${rut}`);
    res.json(result);
  } catch (err) {
    console.error(`Error en inicio de sesión: ${err.message}`);
    res.status(401).json({ message: err.message });
  }
};

// Función de prueba solo para desarrollo
if (process.env.NODE_ENV === 'development') {
  exports.testBusquedaUsuario = async (rutPrueba = '12345678-9') => {
    try {
      const usuario = await Usuario.findOne({ rut: rutPrueba });
      if (!usuario) {
        console.log(`No se encontró el usuario con RUT: ${rutPrueba}`);
      } else {
        console.log(`Usuario encontrado: RUT ${usuario.rut}, Nombre: ${usuario.nombre}`);
      }
    } catch (error) {
      console.error(`Error en la búsqueda de usuario: ${error.message}`);
    }
  };
}