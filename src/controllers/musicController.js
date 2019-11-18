const Music = require('../models/music')

module.exports = {
    async index(req, res) {
        const musics = await Music.find().sort({ 'createdAt': -1 })
        return res.send({musics})
    },
    async store(req, res) {
        try {
            const { musicName, image } = req.body

            const music = await Music.create({
                musicName,
                image,
            })

            req.io.emit('music', music)

            return res.send({music})

        } catch (error) {
            return res.status(400).send({ error: 'Failed create music' })
        }
    }
}