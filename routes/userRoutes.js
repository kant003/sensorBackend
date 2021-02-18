
var express = require('express')
const UserController = require('../controllers/userController')
//const verifyToken = require('../middleware/verifyToken')

var api = express.Router()

api.get('/', UserController.getUsers) // devolver todos los usuarios
api.get('/:id', UserController.getUser ) // devolver un usuario en particular (id)
//api.post('/', UserController.saveUser) // insertar usuario nuevo(registro/singup) (los datos los obtengo del body)
api.put('/:id', UserController.updateUser) // actualizamos un usuario completo (id) (la información nueva me llega por el body)
api.delete('/:id', UserController.deleteUser) // borramos un usuario enparticular (id)

module.exports = api