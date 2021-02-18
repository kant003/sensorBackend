let Dato = require('./sensorSchema')

function saluda(req, res){
    let nombre = req.params.nombre
    res.status(200).send('Hola '+ nombre)
}
// Devuelve los datos del sensor(temperatura, humedad y co2) almacenados en la BD mongo
async function getDatos(req, res) {
    // Usando callbacks
    /*Dato.find({}).exec((err, datos)=>{
        if(err){
            res.status(500).send('error')
        }else if(datos){
            res.status(200).json(datos)
        }else{
            res.status(404).send('no hay datos disponibles')
        }
    })*/

    // Usando promesas
    /*Dato.find({}).exec()
        .then(datos =>res.status(200).json(datos))
        .catch(error => res.status(500).send('error:'+error))*/
    try{
        const datos = await Dato.find({}).exec()
        res.status(200).json(datos)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}
// Devuelve un dato en particular(tempe, hume, c02)
// El id del dato me llega por: params
async function getDato(req, res) {
    const datoId = req.params.id
    try{
        const datoEncontrado = await Dato.findById(datoId)
        res.status(200).json(datoEncontrado)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

// Devuelve un dato en particular(tempe, hume, c02)
// El id del dato me llega por: params
async function getUltimoDato(req, res) {
    const datoId = req.params.id
    try{
        const datoEncontrado = await Dato.find({}).sort('-fecha').findOne()
        res.status(200).json(datoEncontrado)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}



// Almacena un dato nuevo en la bd mongo
// La informacion del dato nos llega por el body
async function saveDato(req, res){
    const datosBody = req.body
    const dato = new Dato(datosBody)
    try{
        const datoGuardado = await dato.save()
        res.status(200).json('Informacion guardada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }

}
async function updateDato(req, res){
    const datoId = req.params.id
    const datosBody = req.body
    try{
        const datoActualizado = await Dato.findByIdAndUpdate(datoId, datosBody)
        res.status(200).json('Informacion actualizada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

async function deleteDato(req, res){
    const datoId = req.params.id
    try{
        const datoBorrado = await Dato.findByIdAndRemove(datoId)
        res.status(200).json('Informacion borrada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }
}
module.exports = { getDatos, saluda, getDato, getUltimoDato, saveDato, updateDato, deleteDato }