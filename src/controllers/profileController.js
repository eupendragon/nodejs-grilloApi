const Profile = require('../models/profile.js');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        // retorna os posts por data de criação
        const profiles = await Profile.find().sort({ 'createdAt': -1 });

        return res.json(profiles);
    },
    async image(req, res) {
        try {
            const profile = await Profile.findOne({ _id: req.query.id }).exec()
            res.status(200).sendFile(profile.image)
        } catch (error) {
            res.status(404).json(error)
        }
    },
    async store(req, res) {
        const { nome, email, login, password, estado, instrumento, estilo, cpf } = req.body;
        const { filename: key } = req.file;
        const url = path.resolve(req.file.destination, 'resized', key)

        // redimensiona a imagem do post para aumento de perfomance
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(url)
        // apaga a imagem original    
        fs.unlinkSync(path.resolve(req.file.destination, 'key'));

        const profile = await Profile.create({
            nome,
            email,
            login,
            password,
            estado,
            instrumento,
            estilo,
            cpf,
            image: url,
        });

        // Socket IO = Compartilhar Informações em tempo real
        req.io.emit('profile', profile);

        return res.json(profile);
    }
};