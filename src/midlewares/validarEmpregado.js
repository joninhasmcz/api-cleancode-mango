const { body } = require('express-validator')

const validarEmpregado = [
  body('nome')
    .trim()
    .notEmpty()
    .withMessage('O nome é obrigatório')
    .isLength({ min: 3 })
    .withMessage('O nome precisa ter pelo menos 3 caracteres'),
  body('cargo')
    .isIn(['Gerente', 'Funcionário', 'Diarista', 'Estagiário'])
    .withMessage('Cargo inválido'),
  body('salario')
    .isFloat({
      min: 0
    })
    .withMessage('Salário deve ser um número positivo')
]

module.exports = validarEmpregado
