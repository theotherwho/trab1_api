const {Client} = require('pg');

const conexao = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
}

const ListaMovimentosProcesso = [];
let proximoIdMovimento = 1;

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM movimento_processo ORDER BY 1 ASC");
    const ListaMovimentosProcesso = result.rows;
    await client.end();
    return ListaMovimentosProcesso;
}

async function inserir(movimento) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("INSERT INTO movimento_processo "+
                                     " (num_processo, desc_movimento_processo) "+
                                     " VALUES ($1,$2) RETURNING *",
                    [movimento.num_processo, 
                    movimento.desc_movimento_processo]);
    const movimentoInserido = result.rows[0];
    await client.end();
    return movimentoInserido;
}

async function atualizar(IdMovimento, movimento) {
    const sql = 'UPDATE movimento_processo SET desc_movimento_processo = $1,'+                
                ' num_processo = $2 '+
                ' WHERE idmovimento_processo = $3 RETURNING *'
    const values = [movimento.desc_movimento_processo, 
                    movimento.num_processo, 
                    movimento.idmovimento_processo];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const movimentoAtualizado = res.rows[0];
    await cliente.end();
    return movimentoAtualizado;
}

async function deletar(IdMovimento) {
    const sql = ' DELETE FROM movimento_processo  ' +
                ' WHERE idmovimento_processo=$1 RETURNING *';
    const values = [IdMovimento];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const movimentoApagado = res.rows[0];
    await cliente.end();
    return movimentoApagado;
}

async function buscarPorMovimentoId(IdMovimento) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query("SELECT mp.idmovimento_processo, mp.desc_movimento_processo , mp.num_processo, p.autor, p.reu " +
                                        " FROM movimento_processo mp, processo p " +
                                        " WHERE mp.num_processo = p.num_processo " +
                                        " AND idmovimento_processo=$1", [IdMovimento]);
    const movimentoprocesso = res.rows[0];
    await cliente.end();
    return movimentoprocesso;
}

module.exports = {
    listar,
    inserir,
    atualizar,
    deletar,
    buscarPorMovimentoId
}