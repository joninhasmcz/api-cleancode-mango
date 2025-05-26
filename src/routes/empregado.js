const express = require('express')
const router = express.Router()
const empregadoController = require('../controllers/empregado')
const validarEmpregado = require('../midlewares/validarEmpregado')

router.get('/', empregadoController.listarEmpregados)
router.post('/', validarEmpregado, empregadoController.criarEmpregado)
router.get('/:id', empregadoController.obterEmpregado)
router.put('/:id', empregadoController.atualizarEmpregado)
router.delete('/:id', empregadoController.excluirEmpregado)

module.exports = router
