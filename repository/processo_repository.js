const {Client} = require('pg');
require("dotenv-safe").config();



let listaProcessos = [];
let proximoProcesso = 1;
/*
  {
    "TipoProcesso": 22,
	"Autor": "Armazem da Esquina",
	"Reu": "Prefeitura de POA"
  }
*/
const conexao = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
}

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT p.num_processo, p.autor, p.reu, p.idtipo_processo, "+
                                     " p.idtipo_processo, tp.desc_tipo_processo " + 
                                     " FROM processo p, tipo_processo tp " +
                                     " WHERE  p.idtipo_processo = tp.idtipo_processo " +
                                     " ORDER BY p.num_processo");
    const listaProcessos = result.rows;
    await client.end();
    return listaProcessos;
}


async function inserir(processo) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("INSERT INTO processo (autor, reu, idtipo_processo) "+
        " VALUES ($1,$2,$3) RETURNING *",
        [processo.Autor, processo.Reu, processo.TipoProcesso]);
    const processoInserido = result.rows[0];
    await client.end();
    return processoInserido;
}

async function buscarPorNumProcesso(numprocesso){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(" SELECT p.num_processo, " +
            " p.autor, p.reu, p.idtipo_processo, tp.desc_tipo_processo "+
            " FROM processo p, tipo_processo tp " +
            " WHERE num_processo=$1",[numprocesso]);
    const processo = res.rows[0];
    await cliente.end();
    return processo;
}

async function atualizar(numprocesso, processo) {
    const sql = 'UPDATE processo set autor=$1, reu=$2, idtipo_processo=$3 '+
                ' WHERE num_processo=$4 RETURNING *'
    const values = [processo.Autor, processo.Reu, processo.TipoProcesso, numprocesso];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const processoAtualizado = res.rows[0];
    await cliente.end();
    return processoAtualizado;    
}

async function deletar(numprocesso) {
    const sql = 'DELETE FROM processo WHERE num_processo=$1 RETURNING *'
    const values = [numprocesso];

    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query(sql,values);
    const processoDeletado = res.rows[0];
    await cliente.end();
    return processoDeletado;
}



async function buscarIdTipoProcesso(IdTipoProcesso) {
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM tipo_processo WHERE IdTipo_Processo=$1',[IdTipoProcesso]);
    const tipoprocesso = res.rows[0];
    await cliente.end();
    return tipoprocesso;
}

function pesquisarPorTipoProcesso(TipoProcesso) {
    return listaProcessos.filter(
        (processo) => {
            return processo.TipoProcesso === TipoProcesso;
        }
    );
}

module.exports = {
    listar,
    inserir,
    buscarPorNumProcesso,
    atualizar,
    deletar,
    pesquisarPorTipoProcesso,
    buscarIdTipoProcesso
}
