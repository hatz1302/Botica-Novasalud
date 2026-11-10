const productoService = require('../services/productoService');

exports.obtenerTodos = async (req, res) => {
    try {
        const productos = await productoService.listar();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crear = async (req, res) => {
    try {
        const nuevo = await productoService.crear(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.obtenerBajoStock = async (req, res) => {
    try {
        const criticos = await productoService.listarBajoStock();
        res.status(200).json(criticos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};