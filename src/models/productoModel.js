const mongoose = require('../database/connection');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    stockMinimo: { type: Number, default: 5 }, 
    lote: { type: String, default: 'LT-2026-A' },
    fechaVencimiento: { type: String, default: '2027-12-31' },
    descripcion: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);