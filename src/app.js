require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const conductorRoutes = require('./routes/conductorRoutes');
const pasajeroRoutes = require('./routes/pasajeroRoutes');
const incidenciaRoutes = require('./routes/incidenciaRoutes');


const mongoose = require('./config/database'); 

const app = express();
const PORT = process.env.PORT || 3000; 



// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/conductores', conductorRoutes); 
app.use('/api/pasajeros', pasajeroRoutes);
app.use('/api/incidencias', incidenciaRoutes);


// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

// Ruta para la API
app.get('/api', (req, res) => {
  res.json({ message: "Bienvenido a la API" });
});

// Manejo de errores 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

