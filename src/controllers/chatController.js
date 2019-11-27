const Conversation = require('../models/conversation')
const Profile = require('../models/profile')

module.exports = {
    async store(req, res) {
        try {
            const { authorId, recipientId } = req.body

            // retorna os posts por data de criação
            const authorProfile = await Profile.findById(authorId)
            console.log(authorProfile)

            const recipientProfile = await Profile.findById(recipientId)
            console.log(recipientProfile)

            if (!authorProfile.conversations.includes(recipientId)) {
                const conversation = await Conversation.create({
                    users: [authorId, recipientId]
                })
                authorProfile.conversations.push(recipientId)

                await authorProfile.save()
                console.log('funf')
            }

            if (!recipientProfile.conversations.includes(authorId)) {
                recipientProfile.conversations.push(authorId)

                await recipientProfile.save()
                console.log('funfdnv')
            }

            return res.json(authorProfile);
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    async listChats(req, res) {
        try {
            const profile = await Profile.findById(req.query.id).populate('conversations')
            return res.send(profile.conversations)
        } catch (error) {
            return res.status(500).send(error)
        }

    },

    async listMessages(req, res) {
        try {
            const messages = await Conversation.find({ users: req.query.id }).populate('users')
            return res.send(profile.conversations)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}