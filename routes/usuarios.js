const express = require('express');
const router = express.Router();
const controller = require('../controller/usuariosController');

router.get('/usuarios', controller.listarUsuarios);
router.get('/dados', controller.listarUsuariosEMesas);

module.exports = router;
