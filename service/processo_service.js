const processoRepository = require('../repository/processo_repository')

async function listar() {
    return await processoRepository.listar();
}

async function inserir(processo) {
    //VALIDA SE O TIPO_PROCESSO EXISTE ANTES DE INSERIR
    const buscaTipoProcesso = await processoRepository.buscarIdTipoProcesso(processo.TipoProcesso)
    if(!buscaTipoProcesso) {
        throw { id: 405, message: "Operação não permitida." };
    }

    if (processo && processo.TipoProcesso && processo.Autor && processo.Reu) {
      const processoInserido = await processoRepository.inserir(processo);
      return processoInserido;

    } else {
        throw { id: 400, message: "O processo não tem todos os dados necessários para a inclusão" };
    }
}

async function buscarPorNumProcesso(NumProcesso) {
    const processo = await processoRepository.buscarPorNumProcesso(NumProcesso);
    if (processo) {
        return processo;
    } else {
        throw { id: 404, message: "Processo não localizado." };
    }
}

async function deletar(numprocesso) {
    const processoapagado = await processoRepository.deletar(numprocesso);
    if (processoapagado) {
        return processoapagado;
    } else {
        throw { id: 404, message: "Processo a excluir não localizado" };
    }
}

async function atualizar(numprocesso, processoAtualizado) {
    /* BUSCAR ID_TIPO_PROCESSO VALIDO */
    const buscaTipoProcesso = await processoRepository.buscarIdTipoProcesso(processoAtualizado.TipoProcesso)
    if(!buscaTipoProcesso) {
        throw { id: 405, message: "Operação não permitida." };
    }
 
    const buscaProcesso = await processoRepository.buscarPorNumProcesso(numprocesso);
    if (!buscaProcesso) {
        throw { id: 404, message: "Processo não localizado" };
    }

    if (processoAtualizado && processoAtualizado.Autor && processoAtualizado.Reu && processoAtualizado.TipoProcesso) {
       processoResultado = await processoRepository.atualizar(numprocesso, processoAtualizado);
       return processoResultado;
    } else {
        throw { id: 400, message: "Para efetivar o cadastro é necessário que sejam fornecidos o Tipo de Processo, Autor e Reu." };
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorNumProcesso,
    atualizar,
    deletar
};
