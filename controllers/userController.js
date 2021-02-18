let User = require('../models/userSchema')
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

// Modifica un usuario existente en la bd mongo
// El id del usuario a modificar me llega por: params
// La informacion del usuario a cambiar nos llega por el body
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

// Borra un usuario existente en la bd mongo
// El id del dato a modificar me llega por: params
async function deleteUser(req, res){
    const userId = req.params.id
    try{
        const usuarioBorrado = await User.findByIdAndRemove(userId)
        res.status(200).json('Informacion borrada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

module.exports = { getUsers, getUser, updateUser, deleteUser}