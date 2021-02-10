
var express = require('express')
const DatosController = require('./datoController')
var api = express.Router()

// api.get('/soy/:nombre', DatosController.saluda)
api.get('/datos', DatosController.getDatos) // devolver todos los datos
api.get('/dato/:id', DatosController.getDato ) // devolver un dato en particular (id)
api.get('/ultimoDato', DatosController.getUltimoDato ) // devolver un dato en particular (id)
api.post('/dato', DatosController.saveDato) // insertar dato nuevo (los datos los obtengo del body)
api.put('/dato/:id', DatosController.updateDato) // actualizamos un dato completo (id) (la información nueva me llega por el body)
api.delete('/dato/:id', DatosController.deleteDato) // borramos un dato enparticular (id)
module.exports = api