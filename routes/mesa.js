const express = require('express');
const router = express.Router();
const controller = require('../controller/mesaController');

router.get('/mesas', controller.listarMesas);



// router.get('/reservas/periodo', controller.reservasPorPeriodo);

module.exports = router;
