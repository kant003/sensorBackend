const mongoose = require('mongoose')
const Schema = mongoose.Schema

let sensorSchema = Schema (
    {
        _id: {type: Schema.ObjectId, auto: true},
        co2: Number,
        temperatura: Number,
        humedad: Number,
        fecha: {type: Schema.Types.Date, default: Date.now },
        idSensor: Number
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model('Dato', sensorSchema)