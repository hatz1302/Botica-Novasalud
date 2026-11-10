const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.obtenerTodos);
router.post('/', productoController.crear);
router.get('/bajo-stock', productoController.obtenerBajoStock);

module.exports = router;