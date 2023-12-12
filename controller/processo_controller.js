const processoService = require('../service/processo_service')


async function listar(req, res) {
    const listaProcessos = await processoService.listar();
    res.json(listaProcessos);
}

async function inserir(req, res) {
    let processo = req.body;
    try {
     const processoInserido = await processoService.inserir(processo);
      res.status(201).json(processoInserido)
    }
    catch(err) {
      //id-> 400 / msg -> msg de erro
      console.log(err.message);
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarPorNumProcesso(req, res) {
    const numprocesso = +req.params.id;
    try {
      const processo = await processoService.buscarPorNumProcesso(numprocesso);
      res.json(processo);
    }
    catch(err) {
      //id-> 404 / msg -> msg de erro
      res.status(err.id).json({msg: err.message});
    }
}

async function atualizar (req, res) {
    const numprocesso = +req.params.id;
    let processo = req.body;
  
    try{ 
     const processoAtualizado =  await processoService.atualizar(numprocesso, processo);
      res.json(processoAtualizado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const numprocesso = +req.params.id;
    try{ 
      const processoapagado = await processoService.deletar(numprocesso);
      res.json(processoapagado);
    }
    catch(err) {
      console.log(err.message);
      res.status(err.id).json({msg: err.message});
    }   
}

module.exports = {
    listar,
    inserir,
    buscarPorNumProcesso,
    atualizar,
    deletar
}