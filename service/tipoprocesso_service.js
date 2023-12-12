const tipoprocessoRepository = require('../repository/tipoprocesso_repository')

async function listar() {
    const ListaTipoProcessoRes = await tipoprocessoRepository.listar();
    //res.json(ListaTipoProcessoRes);
    return ListaTipoProcessoRes;
}

async function inserir(tipoprocesso) {
    if(tipoprocesso && tipoprocesso.desc_tipo_processo) {
      const processoInserido = await tipoprocessoRepository.inserir(tipoprocesso);
       return processoInserido; 
    }
    else {
        throw {id:400, message:"O cadastro do tipo de processo não tem todos os dados necessários para a inclusão"};
    }
}

async function buscarPorIdTipoProcesso(IdTipoProcesso) {
    const tipoprocesso = await tipoprocessoRepository.buscarPorIdTipoProcesso(IdTipoProcesso);
    if(tipoprocesso) {
        return tipoprocesso;
    }
    else {
        throw {id:404, message:"Tipo de Processo nao localizado."};
    }
}
async function buscarRelTipoProcesso (IdTipoProcesso){
    const resTipoProcesso = await tipoprocessoRepository.buscarRelTipoProcesso(IdTipoProcesso);
    if(resTipoProcesso) {
        return resTipoProcesso;
    }
    else {
        throw {id:404, message:"Tipo de Processo nao localizado."};
    }

}




async function deletar(IdTipoProcesso) {
    //const tipoprocesso = await tipoprocessoRepository.buscarPorIdTipoProcesso(IdTipoProcesso);
    const resProcessoIdTipoProcesso = await tipoprocessoRepository.buscarRelTipoProcesso(IdTipoProcesso);
   
    if(!resProcessoIdTipoProcesso) {
       const tipoprocessoApagado = await tipoprocessoRepository.deletar(IdTipoProcesso);
        return tipoprocessoApagado;
    }
    else{
        throw {id:405, message:"Operação não permitida."};
    }
}

async function atualizar(IdTipoProcesso, tipoprocessoAtualizado) {
    const tipoprocesso = await tipoprocessoRepository.buscarPorIdTipoProcesso(IdTipoProcesso);
    if(!tipoprocesso) {
        throw {id: 404, message: "Tipo de Processo não localizado"};
    }
    if(tipoprocesso  && tipoprocessoAtualizado.desc_tipo_processo){
       const tipoprocessoResultado = await tipoprocessoRepository.atualizar(IdTipoProcesso, tipoprocessoAtualizado);
       return tipoprocessoResultado;
    }
    else {
        throw {id: 400, message: "Para efetivar o a atualização é necessário que sejam fornecidos o Tipo de Processo e a sua Descricao."};
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