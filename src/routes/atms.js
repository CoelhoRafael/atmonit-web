var express = require("express");
var router = express.Router();
var atmController = require("../controllers/atmController");


router.get("/findAllTerminals/:idCompany", function (req, res) {
    atmController.findAllTerminals(req, res);
})

module.exports = router;
