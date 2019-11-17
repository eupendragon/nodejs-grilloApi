const Profile = require('../models/profile')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {
    async index(req, res, next) {
        try{
            const {login, password} = req.body
            const user = await Profile.findOne({ login, password})

            if(!user){
                return res.status(400).send({error: 'User not Found'})
            }

            res.send({
                user, 
                token: generateToken({id: user.id})
            })
            // res.send({message: "User authenticated"})
        }
        catch (error) {
            return res.status(400).send({error: 'Invalid token'})
        }
    }
}