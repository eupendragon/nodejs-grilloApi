const Music = require('../models/music')

module.exports = {
    async index(req, res) {
        const musics = await Music.find().sort({ 'createdAt': -1 });
        return res.json(musics);
    },
    async store(req, res) {
        try {
            const { musicName } = req.body

            const music = await Music.create({
                musicName,
            })
            req.io.emit('music', music);

            return res.send({music})

        } catch (error) {
            return res.status(400).send({ error: 'Failed create music' })
        }
    }
}