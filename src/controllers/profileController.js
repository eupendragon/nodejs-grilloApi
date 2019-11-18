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
            const profile = await Profile.findById(req.query.id).exec()
            return res.status(200).sendFile(profile.image)
        } catch (error) {
            return res.status(404).json(error)
        }
    },
    async store(req, res) {
        const { nome, email, login, password, estado, instrumento, estilo, cpf } = req.body;
        const { filename: key } = req.file;

        const inputFile = path.resolve(req.file.destination, key)
        const url = path.resolve(req.file.destination, 'resized'+key)

        console.log(key)

        // redimensiona a imagem do post para aumento de perfomance
        await sharp(inputFile)
            .resize(500)
            .toFile(url)
        // apaga a imagem original    
        fs.unlinkSync(inputFile);

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