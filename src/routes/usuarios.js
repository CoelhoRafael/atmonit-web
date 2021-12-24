var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/listarFuncionarios/:idCompany", function (req, res) {
    usuarioController.listarFuncionarios(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.put("/atualizar/:id_user", function (req, res) {
    usuarioController.atualizarFuncionario(req, res);
})

router.delete("/deletar/:id", function (req, res) {
    usuarioController.deletarFuncionario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.login(req, res);
});

module.exports = router;