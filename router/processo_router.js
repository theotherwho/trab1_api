const express = require('express')
const router = express.Router()
const processoController = require('../controller/processo_controller')

//rota: /api/processo
router.get('/', processoController.listar);
router.post('/', processoController.inserir);
router.get('/:id', processoController.buscarPorNumProcesso);
router.put('/:id', processoController.atualizar);
router.delete('/:id', processoController.deletar);

module.exports = router;