const express = require('express');
const router = express.Router();
const controller = require('../controller/garcomController');

router.put('/confirmar', controller.confirmarReserva);
// router.get('/reservas/periodo', controller.reservasPorPeriodo);

module.exports = router;
