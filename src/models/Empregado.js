const mongoose = require('mongoose')

const empregadoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true
    },
    cargo: {
      type: String,
      required: [true, 'O cargo é obrigatório'],
      enum: ['Gerente', 'Funcionário', 'Diarista', 'Estagiário']
    },
    salario: {
      type: String,
      required: true
    },
    dataContratacao: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Empregado', empregadoSchema)
