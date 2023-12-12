const movimentoprocessoService = require('../service/movimentoprocesso_service')


async function listar(req, res) {
    const ListaMovimentosProcesso = await movimentoprocessoService.listar();
    res.json(ListaMovimentosProcesso);
}

async function inserir(req, res) {
    let movimentoprocesso = req.body;
    try {
      movimentoInserido = await movimentoprocessoService.inserir(movimentoprocesso);
      //res.status(201).json({msg:'MOVIMENTO DE PROCESSO INSERIDO'})
      res.status(201).json(movimentoInserido);
    }
    catch(err) {
      //id-> 400 / msg -> msg de erro
      res.status(400).json({msg: err.message});
    }
}

async function buscarPorIdMovimentoProcesso(req, res) {
    const idmovimentoprocesso = +req.params.id;
    try {
      const movimentoprocesso = await movimentoprocessoService.buscarPorMovimentoId(idmovimentoprocesso);
      res.json(movimentoprocesso);
    }
    catch(err) {
      //id-> 404 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

async function atualizar (req, res) {
    const idmovimentoprocesso = +req.params.id;
    let movimentoprocesso = req.body;
  
    try{ 
      const movimentoAtualizado = movimentoprocessoService.atualizar(idmovimentoprocesso, movimentoprocesso);
      res.json(movimentoAtualizado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
  const idmovimentoprocesso = +req.params.id;
    try{ 
      const movimentoprocessoapagado = await movimentoprocessoService.deletar(idmovimentoprocesso);
      res.json(movimentoprocessoapagado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }   
}

module.exports = {
    listar,
    inserir,
    buscarPorIdMovimentoProcesso,
    atualizar,
    deletar
}