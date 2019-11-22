const Music = require('../models/music')
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        try {
            console.log("Acessando Musicas")
            const musics = await Music.find().sort({ 'createdAt': -1 }).populate('user')
            return res.json(musics)
        } catch (err) {
            return res.status(400).send({ error: 'Error loading music' })
        }
    },

    async list(req, res) {
        try {
            const music = await Music.findById(req.params.musicId).populate('user')
            return res.send({ music })
        } catch (err) {
            return res.status(400).send({ error: 'Error List music' })
        }
    },

    async store(req, res) {
        console.log("rota acessada")
        try {
            const { musicName } = req.body

            const audio = req.files.audio[0].filename
            const image = req.files.image[0].filename

            const [name] = image.split('.');
            const imageName = `${name}.jpg`;
            await sharp(req.files.image[0].path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(
                    path.resolve(req.files.image[0].destination, 'resized', imageName)
                )
            fs.unlinkSync(req.files.image[0].path)
            // =================================================================================================
            // MUSICA
            const [audionam] = audio.split('.')
            const audioName = `${audionam}.mp3`
            
            fs.rename(`./uploads/${audioName}`, `./uploads/musics/${audioName}`, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Arquivos movido")
                }
            })
            path.resolve(req.files.audio[0].destination, 'musics', audioName)

            const music = await Music.create({
                musicName,
                image: imageName,
                audio: audioName,
                user: req.userId
            })

            req.io.emit('music', music)
            return res.json(music)
        } catch (error) {
            console.log(error)
            return res.status(400).send({ error: 'Error creating music' })
        }
    },

    async delete(req, res) {
        try {
            await Music.findByIdAndRemove(req.params.musicId)

            return res.status(200).send({ message: 'Sucess delete' })

        } catch (err) {
            return res.status(400).send({ error: 'Error deleting music' })
        }
    },

    async update(req, res) {
        try {
            const { musicName } = req.body

            const music = await Music.findByIdAndUpdate(req.params.musicId, {
                musicName,
            }, { new: true }).populate('user')

            return res.send({ music })

        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: 'Error update music' })
        }
    }
}