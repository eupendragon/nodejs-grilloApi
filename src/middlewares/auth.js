const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' })
    }
    // Verificando formato do token "Bearer>Hash(a45d4as5d4sa5...)"
    const parts = authHeader.split(' ')

    // Veificando se o token tem duas partes
    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Invalid token' })
    }

    const [scheme, token] = parts;

    // Conferindo se o cabeçalho do token é valido
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformated' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: 'Token invalid' })
        }
        req.userId = decoded.id
    })

    return next()
}