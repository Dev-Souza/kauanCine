const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        data_nascimento: {
            type: Date
        },
        cpf: {
            type: String,
            unique: true
        },
        celular: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        senha: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', schema)
module.exports = User