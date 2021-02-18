
var express = require('express')
const DatosController = require('../controllers/datoController')
const verifyToken = require('../middleware/verifyToken')
var api = express.Router()

// api.get('/soy/:nombre', DatosController.saluda)
api.get('/', DatosController.getDatos) // devolver todos los datos
api.get('/ultimoDato', verifyToken.verifyToken, DatosController.getUltimoDato ) // devolver un dato en particular (id)
api.get('/:id', DatosController.getDato ) // devolver un dato en particular (id)
api.post('/', DatosController.saveDato) // insertar dato nuevo (los datos los obtengo del body)
api.put('/:id', DatosController.updateDato) // actualizamos un dato completo (id) (la información nueva me llega por el body)
api.delete('/:id', DatosController.deleteDato) // borramos un dato enparticular (id)
module.exports = api