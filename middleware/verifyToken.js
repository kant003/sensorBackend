const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(403).send('Acceso denegado. No tienes token')

    try {
        const verificacion = jwt.verify(token, process.env.TOKEN_SECRETO)
    } catch (error) {
        return res.status(401).send('Token invalido:' + error)
    }
    next()
}

module.exports = { verifyToken };
