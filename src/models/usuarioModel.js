const mongoose = require('../database/connection');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['ADMIN', 'FARMACEUTICO'], default: 'FARMACEUTICO' }
}, { timestamps: true });

usuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('Usuario', usuarioSchema);