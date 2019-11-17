const Profile = require('../models/profile');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// JWT CONFIG
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {
    async index(req, res) {
        const profiles = await Profile.find().sort({ 'createdAt': -1 });

        return res.json(profiles);
    },
    async store(req, res) {
        const { nome, email, login, password, estado, instrumento, estilo, cpf } = req.body;
        const { filename: image } = req.file;

        // separando imagem em nome e extensão
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        // redimensiona a imagem do post para aumento de perfomance
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        // apaga a imagem original    
        fs.unlinkSync(req.file.path);

        const profile = await Profile.create({
            nome,
            email,
            login,
            password,
            estado,
            instrumento,
            estilo,
            cpf,
            image: fileName,
        });

        // Socket IO = Compartilhar Informações em tempo real
        req.io.emit('profile', profile);

        return res.send({
            profile,
            token: generateToken({id: profile.id})
        });
    }
};  