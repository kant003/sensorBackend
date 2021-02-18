let User = require('../models/userSchema')
const jwt = require('jsonwebtoken')


function createToken(user){
    return {
        sub: user._id,
        name: user.nombre,
        rol: user.rol,
        exp: Math.floor( Date.now()/1000 + (60*60*24) ), // El token se puedo usar duante 24 horas
        iat: Date.now()
    }
}

async function login(req, res) {
    const userBody = req.body // email, password
    try{ // comprobar si el usuario existe
        let usuarioEncontrado = await User.findOne({email:userBody.email})
        if(!usuarioEncontrado) return res.status(400).json('Error usuario/password incorrecto 1')

        // comprobamos si el password coincide
        const passwordValido = await User.comparePassword(userBody.password, usuarioEncontrado.password)
        if(!passwordValido) return res.status(400).json('Error usuario/password incorrecto 2')
    
        const token = jwt.sign( createToken(usuarioEncontrado), process.env.TOKEN_SECRETO)
        res.header('auth-token', token)
        res.status(200).json(token)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}


async function singup(req, res){
    const userBody = req.body
    const user = new User(userBody)

    try{ // Guadar el nuevo usuario en la BD
        const usuarioGuardado = await user.save()
        const token = jwt.sign( createToken(usuarioGuardado), process.env.TOKEN_SECRETO)
        res.header('auth-token', token)
        res.status(200).json(token)
    }catch(error){
        res.status(500).json('error:'+error)
    }

}

module.exports = { login, singup}