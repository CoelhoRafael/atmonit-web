var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/ultimas/cpu/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCPU(req, res);
});

router.get("/tempo-real/cpu/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCPU(req, res);
});

router.get("/ultimas/ram/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRAM(req, res);
});

router.get("/tempo-real/ram/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRAM(req, res);
});

router.get("/ultimas/disco/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasDISCO(req, res);
});

router.get("/tempo-real/disco/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDISCO(req, res);
});

module.exports = router;