const tipoprocessoService = require('../service/tipoprocesso_service')

async function listar(req, res) {
    const ListaTipoProcessoResultado = await tipoprocessoService.listar();
    res.json(ListaTipoProcessoResultado);
}


async function inserir(req, res) {
    let tipoprocesso = req.body;
    try {
      processoInserido = await tipoprocessoService.inserir(tipoprocesso);
      //res.status(201).json({msg:'TIPO DE PROCESSO INSERIDO'})
      res.status(201).json(processoInserido)
    }
    catch(err) {
      //id-> 400 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarPorIdTipoProcesso(req, res) {
    const idtipoprocesso = +req.params.id;
    try {
      const tipoprocesso = await tipoprocessoService.buscarPorIdTipoProcesso(idtipoprocesso);
      res.json(tipoprocesso);
    }
    catch(err) {
      //id-> 404 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarRelTipoProcesso(req, res) {
  const idtipoprocesso = +req.params.id;
  try {
    const resTipoProcesso = await tipoprocessoService.buscarRelTipoProcesso(idtipoprocesso);
    res.json(resTipoProcesso);
  }
  catch(err) {
    //id-> 404 / msg -> msg de erro
    res.status(err.id).json({msg: err.message});
  }
}

async function atualizar(req, res) {
  const idtipoprocesso = +req.params.id;
  let tipoprocessoAtualizado = req.body;

  try { 
      const tipoprocessoAtualizadoResultado = await tipoprocessoService.atualizar(idtipoprocesso, tipoprocessoAtualizado);
      res.json(tipoprocessoAtualizadoResultado);
  } catch (err) {
      res.status(err.id).json({ msg: err.message });
  }
}

async function deletar(req, res) {
    const idtipoprocesso = +req.params.id;
    try{ 
      const tipoprocessoapagado = await tipoprocessoService.deletar(idtipoprocesso);
      res.json(tipoprocessoapagado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }   
}

module.exports = {
    listar,
    inserir,
    buscarPorIdTipoProcesso,
    atualizar,
    deletar, 
    buscarRelTipoProcesso
}