const express = require('express');
const cors = require('cors');
const productoRouters = require('./routers/productoRouters');
const authRouters = require('./routers/authRouters'); // <-- AÑADIR
require('./database/connection');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: "API Botica Nova Salud activa" });
});

// Rutas
app.use('/api/auth', authRouters);          // <-- AÑADIR
app.use('/api/productos', productoRouters);

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});