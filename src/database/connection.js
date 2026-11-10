const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/botica_novasalud')
    .then(() => console.log('Conectado a MongoDB (botica_novasalud)'))
    .catch(err => console.error('Error de conexión:', err));

module.exports = mongoose;