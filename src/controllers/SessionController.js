const Profile = require('../models/profile')

module.exports = {
    async login(req, res) {
        try {
            const { login, password } = req.body
            console.log(login)
            console.log(password)

            const profile = await Profile.findOne({ login: login })
                .then(res => res)
                .catch(err => err)

            if (profile === null) {
                res.status(203).json({
                    message: 'Não autorizado'
                })
            } else {
                res.status(202).json(profile)
            }

            console.log(profile)
        } catch (error) {
            throw error
        }
    }
}