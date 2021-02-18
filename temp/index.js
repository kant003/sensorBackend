// npm init
// npm install express
// npm install -g -D nodemon
// npm install body-parser
// docker run --name mongo -d -p 27018:27017 mongo
// npm install mongoose     // ORM nos ayuda a realizar consultas con mongoDB
// docker exec -it mongo mongo  // conectarse al motor de mongo por consola
//      show dbs // listar las bases de datos de mongo
// npm install cors
// npm install dotenv
// npm install morgan
// npm install jsonwebtoken         // alternativa jwt-simple
// npm install bcrypt

const express = require('express')
//const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const apiDatos = require('./datoRoutes')
const apiUsers = require('./userRoutes')
const morgan = require('morgan')
const app = express()
//app.use( bodyParser.urlencoded( {extended:false} ))
//app.use( bodyParser.json() )
app.use(express.urlencoded());
app.use(express.json())
app.use( cors() )
app.use( morgan('tiny') )  //dev
dotenv.config()

app.use('/api',apiDatos)
app.use('/api',apiUsers)

app.get('/', (req, res)=>{
    res.status(200).send('Bienvenid@ a nuestro API RestFull (backend)')
})

/*
mongoose.connect('mongodb://localhost:27018/datossensor', (err, res)=>{
    if(err){
        console.log('Error al conectarse a la base de datos:'+ err)
    }else{
        console.log('Conexión con mongoDB correcta')

        app.listen(3000, ()=>{
            console.log('Servidor encendido y a la escucha en el puerto 3000.')
        })
    }
})*/

const run = async () => {
    await mongoose.connect(process.env.URL_BASEDATOS, 
        { useNewUrlParser: true, useUnifiedTopology: true })
    await app.listen(process.env.PUERTO)
    console.log('Servidor y base de datos encendidos correctamente')
}

run().catch(error => console.log('Fallo al arrancar:'+error))
