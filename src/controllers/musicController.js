const Music = require('../models/music')

module.exports = {
    async index(req, res) {
        try {
            const musics = await Music.find().sort({ 'createdAt': -1 }).populate('user')
            return res.send({ musics })
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
        try {
            const { musicName, image} = req.body

            const music = await Music.create({
                musicName,
                image,
                user: req.userId
            })

            req.io.emit('music', music)

            return res.json(music)

        } catch (error) {
            return res.status(400).send({ error: 'Error creating music' })
        }

    },

    async delete(req, res) {
        try {

            await Music.findByIdAndRemove(req.params.musicId)

            return res.status(200).send({message: 'Sucess delete'})
            
        } catch (err) {
            return res.status(400).send({ error: 'Error deleting music' })
        }
    },

    async update(req, res) {
        try {
            const {musicName} = req.body
            
            const music = await Music.findByIdAndUpdate(req.params.musicId,{
                musicName,
            }, {new: true}).populate('user')

            return res.send({music})
            
        } catch (err) {
            return res.status(400).send({ error: 'Error update music' })
        }
    }
}