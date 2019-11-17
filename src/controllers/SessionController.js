const Profile = require('../models/profile')

module.exports = {
    async login(req, res) {
        try {
            const { login, password } = req.body
            console.log("Login = " + login)
            console.log("Senha = " + password)

            const profile = await Profile.findOne({ login: login })
                .then(res => res)
                .catch(err => err)

            if (profile === null) {
                res.status(203).json({
                    message: 'Não autorizado'
                })
            } else {
                res.status(202).json({
                    message: 'Autorizado'
                })
            }

            console.log(profile)
            
        } catch (error) {
            return res.status(400).send({error: 'Account not registred'})
        }
    }
}