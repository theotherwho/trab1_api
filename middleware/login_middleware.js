require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const { Client } = require('pg') ;

//app.use(express.json());

const conexao = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
};

async function validaLogin(usuario) {
    const cliente = new Client(conexao);
    try {
        await cliente.connect();

        const res = await cliente.query('SELECT usuario FROM usuarios WHERE usuario = $1 AND senha = $2', [usuario.user, usuario.senha]);

        if (res.rows.length === 0) {
            // Nenhum usuário encontrado, retorna um código 401 e uma mensagem JSON
            return { auth: false, mensagem: "Login inválido" };
           // res.status(401).json({ auth: false, mensagem: "Login inválido" });
        } else {
            // Usuário encontrado, gera o token // expires in 60*60s
           // console.log(res.rows[0].usuario);
            const token = jwt.sign({ usuario: res.rows[0].usuario }, process.env.SECRET, { expiresIn: 3600 });
            console.log(token);
            return { auth: true, token: token };
        }
    } catch (error) {
        console.error("Erro na consulta ao banco de dados:", error);
        throw error;
    } finally {
        await cliente.end();
    }
}

function verifyJWT(req, res, next){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.usuario;
      next();
    });
}

module.exports = { validaLogin, verifyJWT }
