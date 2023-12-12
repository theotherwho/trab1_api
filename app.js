const express = require('express')
const processoService = require('./service/processo_service')
const processoRouter = require('./router/processo_router')
const movimentoprocessoRouter = require('./router/movimentoprocesso_router')
const tipoprocessoRouter = require('./router/tipoprocesso_router')

const jwt = require('express-jwt')
const login_middleware = require('./middleware/login_middleware')
const port = 3000

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  res.send('<h1>Contexto Raiz</h1>')
})

//authentication
app.post('/login',  async (req, res, next) => {
  try {
      const resultado = await login_middleware.validaLogin(req.body);
      
      if (resultado.auth) {
          return res.json(resultado);
      } else {
          return res.status(401).json(resultado);
          console.log('Login Inválido');
      }
  } catch (error) {
      console.error("Erro na autenticação:", error);
      return res.status(500).json({ auth: false, mensagem: "Erro na autenticação" });
  }
});

app.post('/logout', function(req, res) {
  res.json({ auth: false, token: null });
});


app.use('/api/processos', login_middleware.verifyJWT, processoRouter);

app.use('/api/movimentosprocesso',login_middleware.verifyJWT, movimentoprocessoRouter);

app.use('/api/tiposprocesso',login_middleware.verifyJWT, tipoprocessoRouter);

app.listen(port, () => {
  console.log(`URL: http://localhost:3000 ${port}`)
})