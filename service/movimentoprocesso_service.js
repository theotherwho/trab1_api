const movimentoprocessoRepository = require('../repository/movimentoprocesso_repository')
const processo_repository = require('../repository/processo_repository')
async function listar() {
    const listaMovimentos = await movimentoprocessoRepository.listar();
    return listaMovimentos;
}

async function inserir(movimento) {
    if(movimento && movimento.desc_movimento_processo && movimento.num_processo) {
      const movimentoInserido = await movimentoprocessoRepository.inserir(movimento);
      return movimentoInserido;
    }
    else {
        throw {id:400, message:"O movimento não tem descrição para efetivar o cadastro."};
    }
}


async function atualizar(IdMovimento, movimentoprocesso) {
    const BuscaMovimento = await movimentoprocessoRepository.buscarPorMovimentoId(IdMovimento);
    
    if(!BuscaMovimento) {
        throw {id: 404, message: "Movimento não localizado."};
    }

    const buscaNumProcesso = await processo_repository.buscarPorNumProcesso(movimentoprocesso.num_processo);
  
    if(!buscaNumProcesso) {
        throw {id: 405, message: "Operação não permitida."};
    }

    if(movimentoprocesso && movimentoprocesso.num_processo && movimentoprocesso.desc_movimento_processo){
        movimentoAtualizado = await movimentoprocessoRepository.atualizar(IdMovimento, movimentoprocesso);
        return movimentoAtualizado;
    }
    else {
        throw {id: 400, message: "Para efetivar o cadastro é necessário que seja fornecida a Descricao do Movimento."};
    }
}

async function buscarPorMovimentoId(IdMovimento) {
    const movimento = await movimentoprocessoRepository.buscarPorMovimentoId(IdMovimento);
    if(movimento) {
        return movimento;
    }
    else {
        throw {id:404, message:"Movimento nao localizado."};
    }
}

async function deletar(MovimentoId) {
    const movimento = await movimentoprocessoRepository.buscarPorMovimentoId(MovimentoId);
    if(movimento) {
       const movimentoApagado = await movimentoprocessoRepository.deletar(MovimentoId);
        return movimentoApagado;
    }
    else{
        throw {id:404, message:"Movimento de Processo nao localizado."};
    }
}
module.exports = {
    listar,
    inserir,
    buscarPorMovimentoId,
    atualizar,
    deletar
}