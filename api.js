const express = require('express');
const api = express();
const port = 3000;

api.use(express.json());

api.use('/atendente', require('./routes/atendente'));
api.use('/garcom', require('./routes/garcom'));
api.use('/gerente', require('./routes/gerente'));
api.use('/mesa', require('./routes/mesa'));
api.use('/usuarios', require('./routes/usuarios'));

api.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
