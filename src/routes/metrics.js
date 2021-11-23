var express = require("express");
var router = express.Router();

var metricController = require("../controllers/medidaController");

router.get("/ultimas/:idMaquina", function (req, res) {
    metricController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    metricController.buscarMedidasEmTempoReal(req, res);
});

module.exports = router;