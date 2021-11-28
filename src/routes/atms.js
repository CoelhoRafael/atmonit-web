var express = require("express");
var router = express.Router();
var atmController = require("../controllers/atmController");
var popularTimes = require("../controllers/popularTimes")


router.get("/findAllTerminals/:idCompany", function (req, res) {
    atmController.findAllTerminals(req, res);
})


router.delete("/deletar/:id", function (req, res) {
    atmController.deletarAtm(req, res)
})

router.get("/getPopularTimes/", function (req, res) {
    popularTimes.rodarScriptPython(req, res)
})

module.exports = router;
