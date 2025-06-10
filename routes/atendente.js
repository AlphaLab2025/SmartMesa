const express = require('express');
const router = express.Router();
const controller = require('../controller/reservaController');

router.post('/criar', controller.criarReserva);
router.put('/cancelar', controller.cancelarReserva);

module.exports = router;
