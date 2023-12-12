const {Client} = require('pg');
const jwt = require('jsonwebtoken'); 

const conexao = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
};

let IdTipoProcesso = 1;
//const ListaTipoProcesso = [];

async function listar()  {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM tipo_processo ORDER BY idtipo_processo");
    const ListaTipoProcesso = result.rows;
    await client.end();
    return ListaTipoProcesso;
}

async function inserir(tipoprocesso) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("INSERT INTO tipo_processo (desc_tipo_processo) "+
        " VALUES ($1) RETURNING *",
        [tipoprocesso.desc_tipo_processo]);
    const tipoprocessoInserido = result.rows[0];
    await client.end();
    return tipoprocessoInserido;
}

async function atualizar(IdTipoProcesso, tipoprocesso) {
    const sql = 'UPDATE tipo_processo SET desc_tipo_processo=$2 '+
                ' WHERE idtipo_processo=$1 RETURNING *'
    const values = [IdTipoProcesso, tipoprocesso.desc_tipo_processo];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const tipoprocessoAtualizado = res.rows[0];
    await cliente.end();
    return tipoprocessoAtualizado;  
}

async function deletar(IdTipoProcesso) {
    const sql = 'DELETE FROM tipo_processo WHERE ' + 
                ' IdTipo_Processo=$1 RETURNING *'
    const values = [IdTipoProcesso];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const tipoprocessoDeletado = res.rows[0];
    await cliente.end();
    return tipoprocessoDeletado;
}

async function buscarRelTipoProcesso (IdTipoProcesso){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT tp.* FROM processo p, tipo_processo tp ' +
                                    ' WHERE p.idtipo_processo = tp.idtipo_processo ' +
                                    ' AND tp.IdTipo_Processo=$1',[IdTipoProcesso]);
    const tipoprocesso = res.rows[0];
    await cliente.end();
    return tipoprocesso;

}

async function buscarPorIdTipoProcesso(IdTipoProcesso) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM tipo_processo WHERE IdTipo_Processo=$1',[IdTipoProcesso]);
    const tipoprocesso = res.rows[0];
    await cliente.end();
    return tipoprocesso;
}

module.exports = {
    listar,
    inserir,
    atualizar,
    deletar,
    buscarPorIdTipoProcesso,
    buscarRelTipoProcesso
}