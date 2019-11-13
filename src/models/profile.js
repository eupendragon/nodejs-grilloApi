const mongoose = require('mongoose'); // Importando biblioteca

const ProfileSchema = new mongoose.Schema({
    nome: String,
    email: String,
    login: String,
    password: String,
    estado: String,
    instrumento: String,
    estilo: String,
    cpf: String,
    image: String,
},{
    timestamps: true,
});

module.exports = mongoose.model('Profile',ProfileSchema);