
var express = require('express')
const UserController = require('./userController')
var api = express.Router()

// api.get('/soy/:nombre', DatosController.saluda)
api.get('/users', UserController.getUsers) // devolver todos los usuarios
api.get('/user/:id', UserController.getUser ) // devolver un usuario en particular (id)
api.post('/user', UserController.saveUser) // insertar usuario nuevo(registro/singup) (los datos los obtengo del body)
api.put('/user/:id', UserController.updateUser) // actualizamos un usuario completo (id) (la información nueva me llega por el body)
api.delete('/user/:id', UserController.deleteUser) // borramos un usuario enparticular (id)
api.post('/login', UserController.login) // Logueamos el usuario (devolvemos el token)
module.exports = api