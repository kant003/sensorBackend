let User = require('./userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Devuelve todos los usuarios
async function getUsers(req, res) {
    try{
        const usuarios = await User.find({}).exec()
        res.status(200).json(usuarios)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}
// Devuelve un usuario en particula
// El id del usuario me llega por: params
async function getUser(req, res) {
    const userId = req.params.id
    try{
        const usuarioEncontrado = await User.findById(userId)
        res.status(200).json(usuarioEncontrado)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}


// Registrar usuario
// Almacena un usuario nuevo en la bd mongo
// La informacion del usuario nos llega por el body
async function saveUser(req, res){
    const userBody = req.body
    const user = new User(userBody)
    try{ // Comprobar si ya existe un usuario con ese email en la BD
        let usuarioEncontrado = await User.findOne({email:userBody.email})
        if(usuarioEncontrado) return res.status(400).json('Error: Usuario repetido')
    }catch(error){
        res.status(500).json('error:'+error)
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(userBody.password, salt)

    try{ // Guadar el nuevo usuario en la BD
        user.password = hashPassword
        const usuarioGuardado = await user.save()
        res.status(200).json('Informacion guardada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }

}

async function updateUser(req, res){
    const userId = req.params.id
    const userBody = req.body
    try{
        const usuarioActualizado = await User.findByIdAndUpdate(userId, userBody)
        res.status(200).json('Informacion actualizada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

async function deleteUser(req, res){
    const userId = req.params.id
    try{
        const usuarioBorrado = await User.findByIdAndRemove(userId)
        res.status(200).json('Informacion borrada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

async function login(req, res) {
    const userBody = req.body // email, password
    try{ // comprobar si el usuario existe
        let usuarioEncontrado = await User.findOne({email:userBody.email})
        if(!usuarioEncontrado) return res.status(400).json('Error usuario/password incorrecto 1')

        // comprobamos si el password coincide
        const passwordValido = await bcrypt.compare(userBody.password, usuarioEncontrado.password)
        if(!passwordValido) return res.status(400).json('Error usuario/password incorrecto 2')
    
        const token = jwt.sign(
            {
                sub: usuarioEncontrado._id,
                name: usuarioEncontrado.nombre,
                rol: 'Admin',
                exp: Math.floor( Date.now()/1000 + (60*60) ), // El token se puedo usar duante 1 hora
                iat: Date.now()
            },
            process.env.TOKEN_SECRETO
        )
        res.header('auth-token', token)
        res.status(200).json(token)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}
module.exports = { getUsers, getUser, saveUser, updateUser, deleteUser, login}