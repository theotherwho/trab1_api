const express = require('express');
const router = express.Router();
const movimentoprocessoController = require('../controller/movimentoprocesso_controller');


// Router: /api/movimentoprocesso
router.get('/', movimentoprocessoController.listar);
router.post('/',movimentoprocessoController.inserir);
router.get('/:id', movimentoprocessoController.buscarPorIdMovimentoProcesso);
router.put('/:id',movimentoprocessoController.atualizar);
router.delete('/:id',movimentoprocessoController.deletar);

module.exports = router;
