const Producto = require('../models/productoModel');

class ProductoService {
    async listar() {
        return await Producto.find();
    }

    async crear(datos) {
        const nuevoProducto = new Producto(datos);
        return await nuevoProducto.save();
    }

    async listarBajoStock() {
        return await Producto.find({ $expr: { $lte: ["$stock", "$stockMinimo"] } });
    }

    async procesarVenta(items) {
        for (const item of items) {
            const producto = await Producto.findById(item._id);
            if (!producto || producto.stock < 1) {
                throw new Error(`Stock insuficiente para: ${item.nombre}`);
            }
            producto.stock -= 1;
            await producto.save();
        }
        return { mensaje: "Venta procesada y stock actualizado con éxito" };
    }
}

module.exports = new ProductoService();