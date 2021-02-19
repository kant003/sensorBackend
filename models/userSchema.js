const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let Schema = mongoose.Schema

let UserSchema = Schema(
    {
        _id: { type: Schema.ObjectId, auto: true },
        nombre: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        rol: { type: String, enum: ['public', 'admin'], default: 'public' },
    },
    {
        timestamps: true,
        versionKey: false
    }
)


UserSchema.pre('save', async function(next) { // No usar funcion tipo flecha
    if (this.isModified('password') === false) {
        next();
    } else {
        const saltRounds = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, saltRounds)
        next();
    }
});

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model('User', UserSchema)