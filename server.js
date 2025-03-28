// Importando o Next.js e o Express
const express = require('express');
const next = require('next');

// Criando o app Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Criando o app Express
const server = express();

// Middlewares (por exemplo, para lidar com JSON)
server.use(express.json());

// Configurar rotas personalizadas do Express aqui, se necessário
// Por exemplo: server.use('/api', require('./src/app/api/routes/route'));

// Manter o Next.js para todas as requisições não capturadas
server.all('*', (req, res) => {
  return handle(req, res); // Delega o tratamento da requisição para o Next.js
});

// Configurando o servidor para rodar na porta 3000 (ou outra porta que você preferir)
const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Servidor rodando na porta ${PORT}`);
});