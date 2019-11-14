const Profile = require('../models/profile')

module.exports = {
    async login(req, res) {
        const { login, password } = req.body

        try {
            const profile = await Profile.findOne({ login })
            
            if (login === profile.password) {
                res.json({
                    message: 'Autorizado'
                })
            } else {
                res.json({
                    message: 'Dados Inválidos'
                })
            }
        } catch (error) {
            throw error
        }
    }
}