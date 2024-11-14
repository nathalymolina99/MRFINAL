const mongoose = require('mongoose');


mongoose.set('strictQuery', false);

const uri = 'mongodb://localhost:27017/mrdatabase'; 


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error al conectar con MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
  console.log('Nombre de la base de datos:', mongoose.connection.name);
});

module.exports = mongoose;
