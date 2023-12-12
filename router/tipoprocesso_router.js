const express = require('express');
const router = express.Router();
const tipoprocessoController = require('../controller/tipoprocesso_controller');
const verifyJWT = require('../middleware/login_middleware');

// Rotas protegidas com autenticação
router.get('/', tipoprocessoController.listar);
router.post('/', tipoprocessoController.inserir);
router.get('/:id', tipoprocessoController.buscarPorIdTipoProcesso);
router.put('/:id', tipoprocessoController.atualizar);
router.delete('/:id', tipoprocessoController.deletar);

module.exports = router;