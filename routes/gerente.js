const express = require('express');
const router = express.Router();
const controller = require('../controller/gerenteController');

router.get('/relatorio/periodo', controller.reservasPorPeriodo);
router.get('/relatorio/mesa/:mesa', controller.reservasPorMesa);
router.get('/relatorio/garcom/:garcom', controller.reservasPorGarcom);


module.exports = router;
