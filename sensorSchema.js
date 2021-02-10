let mongoose = require('mongoose')
let Schema = mongoose.Schema

let sensorSchema = Schema (
    {
        _id: {type: Schema.ObjectId, auto: true},
        co2: Number,
        temperatura: Number,
        humedad: Number,
        fecha: {type: Schema.Types.Date, default: Date.now },
        idSensor: Number
    }
)

module.exports = mongoose.model('dato', sensorSchema)