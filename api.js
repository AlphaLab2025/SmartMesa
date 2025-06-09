const express = require('express');
const cors = require('cors');
const { default: open } = require('open');
const path = require('path');

const api = express();
const port = 3000;

(async () => {
  const garcom = path.join(__dirname, 'frontend/tela-clientes', 'garcom.html');
  const atendente = path.join(__dirname, 'frontend/tela-clientes', 'atendente.html');
  const gerente = path.join(__dirname, 'frontend/tela-clientes', 'gerente.html');

  // Abrir cada um em nova janela (usando o Chrome como exemplo)
  await open(garcom);
  await open(atendente);
  await open(gerente);
})();

api.use(cors());
api.use(express.json());

api.use('/atendente', require('./routes/atendente'));
api.use('/garcom', require('./routes/garcom'));
api.use('/gerente', require('./routes/gerente'));
api.use('/mesa', require('./routes/mesa'));
api.use('/usuarios', require('./routes/usuarios'));

api.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
