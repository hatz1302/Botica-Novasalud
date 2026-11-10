const Producto = require('../models/productoModel');

class ProductoService {
    async listar() {
        return await Producto.find();
    }

    async crear(datos) {
        const nuevo = new Producto(datos);
        return await nuevo.save();
    }

    async listarBajoStock() {
        return await Producto.find({ $expr: { $lte: ["$stock", "$stockMinimo"] } });
    }
}

module.exports = new ProductoService();